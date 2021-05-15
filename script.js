// require
const Peer = require('skyway-js');
const peer = new Peer({ key: '5813577d-1584-46a6-857a-843dac2b0541' });

// import
import Peer from 'skyway-js';
const peer = new Peer({ key: '5813577d-1584-46a6-857a-843dac2b0541' });

//Peer作成
const peer = new Peer({
    key: '5813577d-1584-46a6-857a-843dac2b0541',
    debug: 3
});

//PeerID取得
peer.on('open', () => {
    document.getElementById('my-id').textContent = peer.id;
});

// 発信処理
document.getElementById('make-call').onclick = () => {
    const theirID = document.getElementById('their-id').value;
    const mediaConnection = peer.call(theirID, localStream);
    setEventListener(mediaConnection);
};

// イベントリスナを設置する関数
const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
        // video要素にカメラ映像をセットして再生
        const videoElm = document.getElementById('their-video')
        videoElm.srcObject = stream;
        videoElm.play();
    });
}

//着信処理
peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
});

// エラー処理
peer.on('error', err => {
    alert(err.message);
});

// close 
peer.on('close', () => {
    alert('通信が切断しました。');
});