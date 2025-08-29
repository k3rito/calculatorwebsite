// script.js

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Tabs ----------
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  function activateTab(button) {
    tabs.forEach(t => t.classList.remove('active'));
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    contents.forEach(c => c.classList.remove('active'));

    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(button.dataset.tab);
    if (panel) panel.classList.add('active');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  // ---------- Helper Functions ----------
  function formatNumber(num) {
    return Math.round(num * 100) / 100;
  }

  // ---------- 1. العمر الميلادي ----------
  const birthInput = document.getElementById('birthDate');
  const ageResult = document.getElementById('ageResult');
  birthInput.addEventListener('input', () => {
    const birth = new Date(birthInput.value);
    if (birth.toString() !== 'Invalid Date') {
      const now = new Date();
      const diff = now - birth;
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      ageResult.textContent = `🧮 ${years} سنة، ${months} شهر، ${days} يوم، ${hours} ساعة`;
    } else {
      ageResult.textContent = '';
    }
  });

  // ---------- 2. العمر الهجري (تقريب) ----------
  const hijriInput = document.getElementById('birthHijri');
  const hijriResult = document.getElementById('hijriResult');
  hijriInput.addEventListener('input', () => {
    const birth = new Date(hijriInput.value);
    if (birth.toString() !== 'Invalid Date') {
      const now = new Date();
      const diff = now - birth;
      const hijriYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 354.367));
      hijriResult.textContent = `🕌 ${hijriYears} سنة هجرية`;
    } else hijriResult.textContent = '';
  });

  // ---------- 3. BMI ----------
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const bmiResult = document.getElementById('bmiResult');

  function calculateBMI() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value) / 100;
    if (weight > 0 && height > 0) {
      const bmi = weight / (height * height);
      let category = '';
      if (bmi < 18.5) category = 'نقص الوزن';
      else if (bmi < 25) category = 'وزن طبيعي';
      else if (bmi < 30) category = 'زيادة وزن';
      else category = 'سمنة';
      bmiResult.textContent = `⚖️ BMI: ${formatNumber(bmi)} (${category})`;
    } else bmiResult.textContent = '';
  }

  weightInput.addEventListener('input', calculateBMI);
  heightInput.addEventListener('input', calculateBMI);

  // ---------- 4. الإباضة ----------
  const lastPeriodInput = document.getElementById('lastPeriod');
  const ovulationResult = document.getElementById('ovulationResult');

  lastPeriodInput.addEventListener('input', () => {
    const last = new Date(lastPeriodInput.value);
    if (last.toString() !== 'Invalid Date') {
      const ovulation = new Date(last.getTime() + 14 * 24 * 60 * 60 * 1000);
      ovulationResult.textContent = `💜 موعد الإباضة المتوقع: ${ovulation.toLocaleDateString()}`;
    } else ovulationResult.textContent = '';
  });

  // ---------- 5. الحمل ----------
  const pregInput = document.getElementById('pregnancyDate');
  const pregResult = document.getElementById('pregnancyResult');

  pregInput.addEventListener('input', () => {
    const start = new Date(pregInput.value);
    if (start.toString() !== 'Invalid Date') {
      const due = new Date(start.getTime() + 280 * 24 * 60 * 60 * 1000);
      pregResult.textContent = `🤰 موعد الولادة المتوقع: ${due.toLocaleDateString()}`;
    } else pregResult.textContent = '';
  });

  // ---------- 6. العد التنازلي ----------
  const countdownInput = document.getElementById('countdownDate');
  const countdownResult = document.getElementById('countdownResult');

  countdownInput.addEventListener('input', () => {
    const target = new Date(countdownInput.value);
    if (target.toString() !== 'Invalid Date') {
      const now = new Date();
      let diff = target - now;
      if (diff < 0) diff = 0;
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff / (1000*60*60)) % 24);
      const minutes = Math.floor((diff / (1000*60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      countdownResult.textContent = `⏳ ${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
    } else countdownResult.textContent = '';
  });

  // ---------- 7. حساب النوم ----------
  const wakeInput = document.getElementById('wakeTime');
  const sleepResult = document.getElementById('sleepResult');

  wakeInput.addEventListener('input', () => {
    const wake = wakeInput.value.split(':');
    if (wake.length === 2) {
      const wakeDate = new Date();
      wakeDate.setHours(parseInt(wake[0]));
      wakeDate.setMinutes(parseInt(wake[1]));
      const times = [6,7.5,9]; // نوم كامل: 6,7.5,9 ساعات
      const messages = times.map(t => {
        const d = new Date(wakeDate.getTime() - t*60*60*1000);
        return `🛌 استيقظ الساعة ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')} إذا نمت ${t} ساعة`;
      });
      sleepResult.innerHTML = messages.join('<br>');
    } else sleepResult.textContent = '';
  });

  // ---------- 8. فرق التوقيت ----------
  const tz1Input = document.getElementById('tz1');
  const tz2Input = document.getElementById('tz2');
  const tzResult = document.getElementById('timezoneResult');

  function calculateTZ() {
    const tz1 = parseFloat(tz1Input.value);
    const tz2 = parseFloat(tz2Input.value);
    if (!isNaN(tz1) && !isNaN(tz2)) {
      const diff = tz2 - tz1;
      tzResult.textContent = `🌍 فرق التوقيت: ${diff} ساعة`;
    } else tzResult.textContent = '';
  }

  tz1Input.addEventListener('input', calculateTZ);
  tz2Input.addEventListener('input', calculateTZ);

  // ---------- 9. مفكرة المناسبات ----------
  const eventInput = document.getElementById('eventDate');
  const eventsResult = document.getElementById('eventsResult');
  let eventsList = [];

  eventInput.addEventListener('input', () => {
    const date = new Date(eventInput.value);
    if (date.toString() !== 'Invalid Date') {
      eventsList.push(date.toLocaleDateString());
      eventsResult.innerHTML = eventsList.map(d => `📅 ${d}`).join('<br>');
      eventInput.value = '';
    }
  });

});
