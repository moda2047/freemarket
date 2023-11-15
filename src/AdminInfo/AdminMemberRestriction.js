import React, { useState } from "react";
import "./AdminMemberRestriction.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import moment from "moment";

const AdminMemberRestriction = () => {
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("1day");
  const location = useLocation();
  const navigate = useNavigate();
  const { memberId } = location.state;
  const [cookies] = useCookies(["token"]);
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const calculateEndDate = () => {
    let endDate;
    switch (duration) {
      case "1day":
        endDate = moment().add(1, "days");
        break;
      case "3days":
        endDate = moment().add(3, "days");
        break;
      case "1week":
        endDate = moment().add(1, "weeks");
        break;
      case "1month":
        endDate = moment().add(1, "months");
        break;
      case "1year":
        endDate = moment().add(1, "years");
        break;
      case "permanent":
        endDate = moment("9999-12-31 00:00:00", "YYYY-MM-DD HH:mm:ss");
        break;
      default:
        endDate = moment().add(1, "days");
    }
    return endDate === "permanent"
      ? "permanent"
      : endDate.format("YYYY-MM-DD HH:mm:ss");
  };

  const handleSubmit = () => {
    if (!reason.trim()) {
      window.alert("제재 이유을 입력하세요.");
      return;
    }
    const endDate = calculateEndDate();
    const data = {
      id: memberId,
      reason: reason,
      expire_at:
        endDate === "permanent" ? "permanent" : moment(endDate).toISOString(),
    };
    const url = "http://localhost:8000/sanction/impose";
    const headers = {
      headers: {
        Authorization: cookies.token,
        ContentType: "application/json",
        Accept: "application/json",
      },
    };

    axios
      .post(url, data, headers)

      .then((response) => {
        console.log(response);
        if (response.data.result) {
          window.alert("제재가 성공적으로 마무리 되었습니다.");
          console.log(response.data.message);
          navigate("../AdminMain");
        } else {
          console.log(response.data.message);
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        window.alert("회원 제재 중 오류가 발생했습니다.");
        console.error("회원 제재 중 오류가 발생했습니다.", error);
      });
  };

  const handleCancelClick = () => {
    navigate("../AdminMain");
  };

  return (
    <div className="AdminMemberRestrictionContainer">
      <h1>회원 제재 페이지</h1>
      <label className="AdminMemberRestrictionLabel">회원 ID: {memberId}</label>
      <label className="AdminMemberRestrictionLabel">
        제재 사유 (최대 150글자):
        <textarea
          className="AdminMemberRestrictionTextarea"
          value={reason}
          onChange={handleReasonChange}
          maxLength={150}
        />
      </label>
      <label className="AdminMemberRestrictionDuration-Label">
        제재 기간:
        <select
          className="AdminMemberRestrictionSelect"
          value={duration}
          onChange={handleDurationChange}
        >
          <option value="1day">1일</option>
          <option value="3days">3일</option>
          <option value="1week">1주일</option>
          <option value="1month">1달</option>
          <option value="1year">1년</option>
          <option value="permanent">영구정지</option>
        </select>
      </label>
      <button
        onClick={handleCancelClick}
        className="AdminMemberRestrictionCancel-Button"
      >
        취소
      </button>
      <button
        className="AdminMemberRestrictionSubmit-Button"
        onClick={handleSubmit}
      >
        정지
      </button>
    </div>
  );
};

export default AdminMemberRestriction;
