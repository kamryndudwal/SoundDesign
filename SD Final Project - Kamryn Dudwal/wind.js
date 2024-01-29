  var recorderWind
  var contextwind = new AudioContext
  //creating noise and noise buffer
  let Noise = new AudioBufferSourceNode(contextwind,{loop:true}),
    output = new GainNode(contextwind,{gain:.1})
    Noise.buffer = contextwind.createBuffer(1,contextwind.sampleRate,contextwind.sampleRate)
    for (i=0;i<contextwind.sampleRate;i++) 
    Noise.buffer.getChannelData(0)[i] = 2*Math.random()-1
  let recordGain = new GainNode(contextwind,{gain:.5})
  //using bandpass type on biquad filter
  let mid = new BiquadFilterNode(contextwind, {frequency:100,  type:'bandpass',Q:5,gain:.5})

  //changes the frequency of the biquad filter, values between 100-1000
  Mid.oninput = function() { 
    mid.frequency.value = this.value
  }
  //on click the noise starts
  Play.onclick = function() {
    Noise.start()
    Noise.connect(output)
    output.connect(mid)
    mid.connect(contextwind.destination)
    mid.connect(recordGain)

    let now = contextwind.currentTime
    contextwind.resume()
    output.gain.setValueAtTime(.5, now)
    output.gain.linearRampToValueAtTime(0, now + 100)   
  }
  //on click the noise stops
  Stopwind.onclick = function() {
    Noise.stop()  
  }
  //recorder stuff
  recorderWind = new Recorder(recordGain) //change output to whichever node you want to record
  StartWind.onclick = () => {
    //contextwind.resume()
    recorderWind.record()
  }
  StopWind.onclick = () => {
    recorderWind.stop()
    recorderWind.exportWAV(blob => document.querySelector("audio").src = URL.createObjectURL(blob) )
  }
