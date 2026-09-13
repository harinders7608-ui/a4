// CrocodileTote Master Client Script
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Synchronization
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // 2. Interactive FAQs Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Interactive Leather Grammage & Tote Load Capacity Calculator
  const toteSilhouette = document.getElementById('calc-tote-silhouette');
  const leatherTemper = document.getElementById('calc-leather-temper');
  const hardwareType = document.getElementById('calc-hardware-type');
  const resultEmptyWeight = document.getElementById('calc-weight-val');
  const resultMaxLoad = document.getElementById('calc-load-val');
  const resultThickness = document.getElementById('calc-thickness-val');

  function updateToteEstimates() {
    if (!toteSilhouette || !leatherTemper || !hardwareType) return;
    const sil = toteSilhouette.value;
    const temper = leatherTemper.value;
    const hw = hardwareType.value;

    let baseWeightGrams = 850;
    let maxPayloadKg = 14;
    let leatherThicknessMm = 2.2;

    if (sil === 'grand-carryall') {
      baseWeightGrams = 1250;
      maxPayloadKg = 18;
    } else if (sil === 'petite-gusset') {
      baseWeightGrams = 680;
      maxPayloadKg = 9;
    } else if (sil === 'executive-folio') {
      baseWeightGrams = 920;
      maxPayloadKg = 12;
    }

    if (temper === 'harness-steer') {
      baseWeightGrams *= 1.18;
      maxPayloadKg *= 1.25;
      leatherThicknessMm = 2.6;
    } else if (temper === 'italian-calfskin') {
      baseWeightGrams *= 0.88;
      maxPayloadKg *= 0.90;
      leatherThicknessMm = 1.6;
    }

    if (hw === 'cast-brass') {
      baseWeightGrams += 140;
    } else if (hw === 'antique-bronze') {
      baseWeightGrams += 125;
    } else {
      baseWeightGrams += 95;
    }

    const weightOz = (baseWeightGrams * 0.035274).toFixed(1);
    const maxPayloadLbs = (maxPayloadKg * 2.20462).toFixed(1);

    if (resultEmptyWeight) resultEmptyWeight.textContent = `${Math.round(baseWeightGrams)} g (${weightOz} oz)`;
    if (resultMaxLoad) resultMaxLoad.textContent = `${Math.round(maxPayloadKg)} kg (${maxPayloadLbs} lbs)`;
    if (resultThickness) resultThickness.textContent = `${leatherThicknessMm} mm (${(leatherThicknessMm * 2.5).toFixed(1)} oz)`;
  }

  if (toteSilhouette && leatherTemper && hardwareType) {
    [toteSilhouette, leatherTemper, hardwareType].forEach(el => {
      el.addEventListener('change', updateToteEstimates);
      el.addEventListener('input', updateToteEstimates);
    });
    updateToteEstimates();
  }
});
