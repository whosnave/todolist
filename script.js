// Mengambil data tugas dari localStorage, atau membuat array kosong jika belum ada
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Mengambil data pengguna dari localStorage, atau menginisialisasi jika belum ada
let userPoints = JSON.parse(localStorage.getItem("userPoints")) || 0;
let userLevel = JSON.parse(localStorage.getItem("userLevel")) || 1;

// Fungsi untuk menampilkan tugas pada halaman
function showTask() {
  // Mengambil data terbaru dari localStorage
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  // Variabel untuk menyimpan HTML dari daftar tugas
  let dataListHTML = "";

  // Mengisi variabel dataListHTML dengan HTML untuk setiap tugas
  tasks.forEach((task, index) => {
    dataListHTML += `
      <li data-index="${index}">
        <div class="content">
          <div class="list1">
            <div class="text1">
              <h3>${task.title}</h3>
              <p>${task.date}, ${task.time}</p>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" class="task-checkbox" style="width: 30px; height: 30px" ${task.completed ? "checked" : ""}/>
              <div class="toolscheckbox1">
                <button class="edit1">Edit</button>
                <button class="delete1">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </li>`;
  });

  // Menampilkan daftar tugas ke dalam elemen ul
  const ulList = document.querySelector(".ulList");
  ulList.innerHTML = dataListHTML;

  // Menambahkan event listener untuk setiap tombol delete
  document.querySelectorAll(".delete1").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Mendapatkan indeks tugas yang akan dihapus
      const index = event.target.closest("li").getAttribute("data-index");
      deleteTask(index);
    });
  });

  // Menambahkan event listener untuk setiap tombol edit
  document.querySelectorAll(".edit1").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Mendapatkan indeks tugas yang akan diedit
      const index = event.target.closest("li").getAttribute("data-index");
      editTask(index);
    });
  });

  // Menambahkan event listener untuk setiap checkbox
  document.querySelectorAll(".task-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      // Mendapatkan indeks tugas yang akan diperbarui
      const index = event.target.closest("li").getAttribute("data-index");
      updateTaskCompletion(index, event.target.checked);
    });
  });

  // Memperbarui tampilan user info
  updateUserInfo();
}

// Fungsi untuk menghapus task
function deleteTask(index) {
  tasks.splice(index, 1); // Menghapus task dari array
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Memperbarui localStorage
  showTask(); // Memperbarui tampilan
}

// Fungsi untuk mengedit task
function editTask(index) {
  const task = tasks[index];
  const newTitle = prompt("Edit title:", task.title);
  const newDate = prompt("Edit date:", task.date);
  const newTime = prompt("Edit time:", task.time);

  if (newTitle !== null && newDate !== null && newTime !== null) {
    tasks[index].title = newTitle;
    tasks[index].date = newDate;
    tasks[index].time = newTime;
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Memperbarui localStorage
    showTask(); // Memperbarui tampilan
  }
}

// Fungsi untuk memperbarui status task (completed)
function updateTaskCompletion(index, completed) {
  tasks[index].completed = completed;
  if (completed) {
    userPoints += 5;
  } else {
    userPoints -= 5;
  }

  // Update level ketika point sudah menyentuh 25 (5 Tasks)
  while (userPoints >= 25) {
    userPoints -= 25;
    userLevel += 1;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks)); // Memperbarui localStorage
  localStorage.setItem("userPoints", JSON.stringify(userPoints)); // Memperbarui localStorage
  localStorage.setItem("userLevel", JSON.stringify(userLevel)); // Memperbarui localStorage
  updateUserInfo(); // Memperbarui tampilan user info
}

// Fungsi untuk menambahkan task
function addBtn() {
  const btn = document.getElementById("addBtn");
  btn.addEventListener("click", () => {
    // Input Fields menggunakan .trim() agar tidak error saat save ke localStorage
    const title = document.getElementById("inputAdd").value.trim();
    const date = document.getElementById("inputDate").value.trim();
    const time = document.getElementById("inputTime").value.trim();

    // Kondisi dimana user tidak memasukan salah satu dari 3 input, maka akan muncul alert
    if (title === "" || date === "" || time === "") {
      alert("Masukkan input dengan benar!");
      return;
    }

    // Menambahkan task baru ke array di dalam localStorage
    tasks.push({ title, date, time, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Mengkosongkan Input Fields ketika sudah melakukan fungsi addBtn()
    document.getElementById("inputAdd").value = "";
    document.getElementById("inputDate").value = "";
    document.getElementById("inputTime").value = "";
    
    // Menampilkan ulang daftar tugas
    showTask();
  });
}

addBtn();

// Fungsi addBtn dengan menggunakan enter pada keyboard
function onKey(event) {
  if (event.key === "Enter") {
    document.getElementById("addBtn").click();
  }
}

// Mendeklarasikan variabel untuk memanggil HTML input, lalu membuat agar kita bisa enter di semua input fields
const inputElements = document.querySelectorAll("#inputAdd, #inputDate, #inputTime");
inputElements.forEach((input) => input.addEventListener("keydown", onKey));

// Fungsi untuk memperbarui tampilan user info
function updateUserInfo() {
  document.querySelector(".level").textContent = `Level ${userLevel}`;
  document.querySelector(".points").textContent = `Points: ${userPoints}`;
}

// Menampilkan daftar tugas saat halaman pertama kali dimuat
showTask();
