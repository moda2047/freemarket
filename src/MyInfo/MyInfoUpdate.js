import React, { useState } from "react";
import "./MyInfoUpdate.css";

const MyInfoUpdate = (props) => {
  return (
    <div className="MyInfoUpdateWrap">
      <div className="MyInfoUpdateWrapDiv">
        <h3>
          <img src="./image/MyInfoUpdate.png" alt="nono"></img>
        </h3>
      </div>
      <hr />
      <div className="MyInfoUpdateMainWrap">
        <div className="MyInfoUpdateMainIntro">
          <div className="MyInfoUpdateMainIntroImgDiv">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
          </div>
          <span className="MyInfoUpdateMainIntroSpan">이우찬</span>
          님의 정보입니다.
        </div>
        <div className="MyInfoUpdateMainContentsWrap">
          <table>
            <tr>
              <td>아이디</td>
              <td>
                <input value={"useState써서 변경해야하는 부분"}></input>
              </td>
            </tr>
            <tr>
              <td>비밀번호 변경</td>
              <td>
                <input value={"useState써서 변경해야하는 부분"}></input>
              </td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>
                <input value={"useState써서 변경해야하는 부분"}></input>
              </td>{" "}
            </tr>
            <tr>
              <td>이름</td>
              <td>
                <input value={"useState써서 변경해야하는 부분"}></input>
              </td>{" "}
            </tr>
            <tr>
              <td>전화번호</td>
              <td>
                <input value={"useState써서 변경해야하는 부분"}></input>
              </td>{" "}
            </tr>
          </table>
        </div>
      </div>
      <div className="MyInfoUpdateBtnWrap">
        <div className="MyInfoUpdateBtnGoUpdate">
          <button>수정</button>
        </div>
      </div>
    </div>
  );
};

export default MyInfoUpdate;
