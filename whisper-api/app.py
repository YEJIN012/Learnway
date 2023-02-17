from flask import Flask, abort, request, copy_current_request_context, make_response
from tempfile import TemporaryFile
import whisper
import torch
import re
import subprocess
import requests
import sys
import time
import os
from urllib.parse import unquote
from threading import Thread, Event

app = Flask(__name__)

@app.route("/")
def hello():
    return "Whisper Hello World!"


@app.route('/whisper', methods=['GET'])
def handler():
    class RequestState:
        def __init__(self):
            self.response = None
            self.event = Event()

    state = RequestState()

    @copy_current_request_context
    def transcript(state):
        # Check if NVIDIA GPU is available
        torch.cuda.is_available()
        DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

        # Load the Whisper model:
        model = whisper.load_model("base", device=DEVICE)
        
        start = time.time()
        print(request, file=sys.stderr)
        if not request.args.get("audio_url"):
            # If the user didn't submit any files, return a 400 (Bad Request) error.
            abort(400)
        encoded_url = request.args.get("audio_url")
        print("encoded url : " + encoded_url, file=sys.stderr)

        url = unquote(encoded_url)
        print("decoded url : " + url, file=sys.stderr)

        reg_result = re.search(".*/(.*)", url)

        if reg_result:
            origin_name = reg_result.group(1)
            print("origin_name : " + origin_name, file=sys.stderr)

        else:
            print("No match found.")
        file_origin = requests.get(url)

        with open(origin_name, "wb+") as file:
            file.write(file_origin.content)

        
        input_file = origin_name
        output_file = re.sub("\.(.*)", ".wav",  input_file)

        subprocess.run(["ffmpeg", "-i", input_file, output_file])

        result = model.transcribe(input_file,fp16=False)
        sentences = result.get("text").replace(".", "./").replace("?","./")

        os.remove(input_file)
        os.remove(output_file)
        
        print(sentences, file=sys.stderr)
        end = time.time()
        print(f"{end-start:.2f} sec", file=sys.stderr)
        
        state.response = make_response(sentences)
        state.event.set()

    Thread(target=transcript, args=(state,)).start()
    state.event.wait()
    return state.response

if __name__ == "__main__":
    app.run(threaded=True)
