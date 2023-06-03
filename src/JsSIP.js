import JsSIP from 'jssip';

const socket = new JsSIP.WebSocketInterface('wss://sbc03.tel4vn.com:7444'); // thay đổi địa chỉ SIP server tương ứng
const configuration = {
    sockets: [socket],
    uri: '101@2-test1.gcalls.vn:50061',
    password: 'test1101'
};
const userAgent = new JsSIP.UA(configuration);

userAgent.start();

const session = userAgent.invite('sip:destination@example.com', {
    mediaConstraints: {
      audio: true,
      video: false,
    },
  });
  
  // Xử lý các sự kiện của cuộc gọi
  session.on('connecting', (e) => {
    console.log('Đang kết nối...');
  });
  
  session.on('progress', (e) => {
    console.log('Đang kết nối...');
  });
  
  session.on('accepted', (e) => {
    console.log('Cuộc gọi đã được chấp nhận');
  });
  
  session.on('ended', (e) => {
    console.log('Cuộc gọi đã kết thúc');
  });