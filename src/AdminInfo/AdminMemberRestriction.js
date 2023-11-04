import React, { useState } from "react";
import "./Test.css";

const AdminMemberRestriction = ({ memberId }) => {
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("1day");

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmit = () => {
    // memberId, reason, duration을 서버로 전송하거나 저장할 수 있습니다.
    console.log("회원 ID:", memberId);
    console.log("제재 사유:", reason);
    console.log("제재 기간:", duration);
  };

  const handleCancelClick = () => {};

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
