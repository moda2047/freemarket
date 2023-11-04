import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar.js";
import AdminMemberList from "./AdminMemberList";
import AdminReportSearchList from "./AdminReportSearchList";
import AdminMemberRestrictionList from "./AdminMemberRestrictionList";
import "./AdminMain.css";

const AdminMain = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    console.log("activeTab is now:", activeTab); // 추가한 콘솔 로그
  };

  return (
    <>
      <div className="AdminMainWrap">
        <div className="AdminMainSidebar">
          <AdminSidebar activeTab={activeTab} onTabClick={handleTabClick} />
        </div>
        <div className="AdminMainMajorWrap">
          {activeTab === 0 && <AdminReportSearchList />}
          {activeTab === 1 && <AdminMemberList />}
          {activeTab === 2 && <AdminMemberRestrictionList />}
        </div>
      </div>
    </>
  );
};

export default AdminMain;
