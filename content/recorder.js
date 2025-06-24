window.startRecording = async function(onStopCallback) {
  const screenStream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true
  });

  const micStream = await navigator.mediaDevices.getUserMedia({
    audio: true
  });

  const combinedStream = new MediaStream([
    ...screenStream.getVideoTracks(),
    ...micStream.getAudioTracks()
  ]);

  const recordedChunks = [];
  const mediaRecorder = new MediaRecorder(combinedStream, {
    mimeType: "video/webm; codecs=vp9"
  });

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    onStopCallback(blob);
  };

  mediaRecorder.start();
  return { recorder: mediaRecorder };
};