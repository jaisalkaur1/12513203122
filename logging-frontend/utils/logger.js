const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function getToken() {
  const authPayload = {
    email: "jaisalkaur97@gmail.com",
    name: "Jaisal Kaur Bajwa",
    rollNo: "12513203122",
    accessCode: "VPpsmT",
    clientID: "frontend_382219c2f37a401dbacf323b18980521",
    clientSecret: "pRjuT2FQxUOiGzGe"
  };

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authPayload)
    });

    const data = await response.json();
    console.log("Token Response:", data);
    return data.token || data.access_token;
  } catch (err) {
    console.error("Failed to get token:", err.message);
    return null;
  }
}

async function Log(stack, level, pkg, message) {
  const token = await getToken();
  if (!token) {
    console.error("Authorization failed. Cannot send log.");
    return;
  }

  const payload = { stack, level, package: pkg, message };

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const result = await response.text();
    console.log("Response Status:", response.status);
    console.log("Response Body:", result);
  } catch (err) {
    console.error("Logging error:", err.message);
  }
}

module.exports = Log;
