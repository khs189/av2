import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import fireapp from "../firebase"; // Firebase 설정 파일

function PhoneAuth() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const auth = getAuth(fireapp);
  const navigate = useNavigate();

  // 📌 입력값을 +82로 변환하는 함수
  const formatPhoneNumber = (input) => {
    let formatted = input.replace(/\D/g, ""); // 숫자 이외의 문자 제거
    if (formatted.startsWith("010")) {
      formatted = "+82" + formatted.slice(1); // "010"을 "+8210"으로 변환
    } else if (formatted.startsWith("+82")) {
      // 이미 +82로 시작하면 그대로 유지
    } else {
      alert("올바른 휴대폰 번호를 입력하세요.");
      return "";
    }
    return formatted;
  };

  const sendOTP = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA verified!");
        },
        "expired-callback": () => {
          alert("reCAPTCHA expired. Please try again.");
        },
      });
    }

    const formattedPhone = formatPhoneNumber(phone);
    if (!formattedPhone) return;

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, formattedPhone, appVerifier)
      .then((confirmationResult) => {
        setConfirmResult(confirmationResult);
      })
      .catch((error) => alert(error.message));
  };

  const verifyOTP = () => {
    confirmResult
      .confirm(verificationCode)
      .then(() => {
        navigate("/home", { state: { name, phone } });
      })
      .catch((error) => alert("인증 실패: " + error.message));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-500 text-white">
      <h1 className="text-3xl font-bold mb-6">휴대폰 인증</h1>
      <input
        type="text"
        placeholder="이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3 p-2 rounded text-black"
      />
      <input
        type="tel"
        placeholder="휴대폰 번호 입력 (01012345678)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mb-3 p-2 rounded text-black"
      />
      {name && phone && (
        <button
          onClick={sendOTP}
          className="bg-yellow-500 text-black px-4 py-2 rounded mb-4 hover:bg-yellow-600 transition"
        >
          인증하기
        </button>
      )}

      {confirmResult && (
        <>
          <input
            type="text"
            placeholder="인증번호 입력"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="mb-3 p-2 rounded text-black"
          />
          <button
            onClick={verifyOTP}
            className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition"
          >
            입력완료
          </button>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default PhoneAuth;
