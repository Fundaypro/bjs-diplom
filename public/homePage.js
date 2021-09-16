let logoutBtn = new LogoutButton();
logoutBtn.action = () => {
    ApiConnector.logout((r)=>{if(r.success) location.reload();})
}