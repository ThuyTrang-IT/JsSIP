import React, { useState, useEffect } from 'react';

function CallConnected({ session, hangupCall }) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Lắng nghe sự kiện cuộc gọi được kết nối
    session.on('accepted', () => {
      // Cập nhật trạng thái cuộc gọi
      setDuration(0);
      const intervalId = setInterval(() => {
        setDuration((duration) => duration + 1);
      }, 1000);

      // Hủy lắng nghe sự kiện khi component bị unmount
      return () => clearInterval(intervalId);
    });
  }, [session]);

  return (
    <div className="call-container">
      <div className="call-info">
        <span className="call-status">Đang trong cuộc gọi</span>
        <span className="call-duration">{formatDuration(duration)}</span>
      </div>
      <div className="call-controls">
        <button className="call-button hangup-button" onClick={hangupCall}>
          Kết thúc cuộc gọi
        </button>
      </div>
    </div>
  );
}

function formatDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default CallConnected;