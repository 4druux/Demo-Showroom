// scripts/createAdmin.js
require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel");
const connectDB = require("./config/db");

connectDB();

const createAdminUsers = async () => {
  const adminUsersData = [
    {
      firstName: "Admin",
      lastName: "Satu",
      email: "admin1demo-showroom@gmail.com",
      password: "admin1demo-showroom",
      role: "admin",
    },
    {
      firstName: "Admin",
      lastName: "Dua",
      email: "admin2demo-showroom@gmail.com",
      password: "addmin2demo-showroom",
      role: "admin",
    },
  ];

  try {
    // Hapus admin lama jika ada (opsional, hati-hati)
    // await User.deleteMany({ role: 'admin' });

    const existingAdmins = await User.countDocuments({ role: "admin" });
    if (existingAdmins >= 2) {
      console.log(
        "Jumlah akun admin sudah maksimal (2). Tidak ada akun baru dibuat."
      );
      mongoose.connection.close();
      return;
    }

    let createdCount = 0;
    for (const adminData of adminUsersData) {
      if ((await User.countDocuments({ role: "admin" })) >= 2) break;

      const userExists = await User.findOne({ email: adminData.email });
      if (!userExists) {
        await User.create(adminData);
        console.log(`Admin ${adminData.email} berhasil dibuat.`);
        createdCount++;
      } else {
        console.log(`Admin ${adminData.email} sudah ada.`);
      }
    }
    if (createdCount > 0) {
      console.log(`${createdCount} akun admin baru berhasil dibuat.`);
    } else {
      console.log(
        "Tidak ada akun admin baru yang perlu dibuat atau sudah mencapai batas maksimal."
      );
    }
  } catch (error) {
    console.error("Error membuat admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUsers();
