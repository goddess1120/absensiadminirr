const admins = ["Exyn0s", "Goddess", "Arion", "Chris", "Salman", "Riqs", "Zee"];
const status = {};
const startTimes = {};
const totalHours = {};

function showSection(id) {
  document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function toggleDuty(name) {
  const now = new Date();
  if (!status[name]) {
    status[name] = true;
    startTimes[name] = now;
  } else {
    status[name] = false;
    const hoursWorked = (now - startTimes[name]) / 3600000;
    const roundedHours = Math.round(hoursWorked);
    totalHours[name] = (totalHours[name] || 0) + Math.max(2, roundedHours);
  }
  renderAll();
}

function renderAll() {
  const onoffList = document.getElementById('onoff-list');
  const dataBody = document.getElementById('data-body');
  const salaryList = document.getElementById('salary-list');

  onoffList.innerHTML = '';
  dataBody.innerHTML = '';
  salaryList.innerHTML = '';

  admins.forEach(name => {
    const isActive = status[name] ? 'On Duty' : 'Off Duty';
    const statusClass = status[name] ? 'on-duty' : 'off-duty';
    const hours = totalHours[name] || 0;
    const salary = hours * 10000;

    onoffList.innerHTML += `
      <div class="card">
        <button onclick="toggleDuty('${name}')">${name}</button><br>
        <span id="status-${name}" class="${statusClass} status-badge">${isActive}</span>
      </div>
    `;

    dataBody.innerHTML += `
      <tr>
        <td>${name}</td>
        <td><span class="${statusClass} status-badge">${isActive}</span></td>
        <td>${hours} jam</td>
      </tr>
    `;

    salaryList.innerHTML += `
      <div class="salary-card">
        <h3>${name}</h3>
        <p>Total Jam Kerja: ${hours} jam</p>
        <p>Gaji: Rp${salary.toLocaleString('id-ID')}</p>
      </div>
    `;
  });
}

renderAll();
