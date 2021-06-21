import io from "socket.io-client";
export default function initSocket(cb) {
  const socket = io("http://localhost:4001", { path: "/draw" });
  socket.on("connect", () => {
    // console.log(socket.id);
  });
  socket.on("connect_error", () => {
    console.log(socket.id, "failed to connect");
    socket.disconnect();
  });
  socket.on("draw", (data) => {
    cb(data.data.current_frame);
  });
  return Object.freeze({
    draw: draw,
  });
  function draw(image) {
    socket.emit("draw", { data: { current_frame: image } });
  }
}
