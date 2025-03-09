import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const { name, phone } = location.state || { name: "없음", phone: "없음" };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-500 text-white">
      <h1 className="text-3xl font-bold mb-6">인증 완료</h1>
      <p className="text-lg">✅ 인증완료: {name} / {phone}</p>
    </div>
  );
}

export default Home;
