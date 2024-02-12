import React, { useState, useEffect } from 'react';
import './Calculator.css';
import { useNavigate } from 'react-router-dom';

const Calculator = () => {

  // Inputs
  const [kararTarihi, setKararTarihi] = useState('');
  const [talepEdilenTutar, setTalepEdilenTutar] = useState(0);
  const [kabulEdilenTutar, setKabulEdilenTutar] = useState(0);
  const [davaciMasrafi, setDavaciMasrafi] = useState(0);
  const [davaliMasrafi, setDavaliMasrafi] = useState(0);
  const [arabulucukGideri, setArabuluculukGideri] = useState(0);

  // Results
  const [reddedilenTutar, setReddedilenTutar] = useState('');
  const [kabulOrani, setKabulOrani] = useState('');
  const [redOrani, setRedOrani] = useState('');
  const [kabulAvukat, setKabulAvukat] = useState('');
  const [redAvukat, setRedAvukat] = useState('');
  const [harc, setHarc] = useState('');
  const [davaliAlinacak, setDavaliAlinacak] = useState('');
  const [davaciAlinacak, setDavaciAlinacak] = useState('');
  const [davaliArabuluculuk, setDavaliArabulucuk] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

 
  const handleDateChange = (event) => {
    setKararTarihi(event.target.value);
  };

  const handleInput1Change = (event) => {
    setTalepEdilenTutar(event.target.value);
  };

  const handleInput2Change = (event) => {
    setKabulEdilenTutar(event.target.value);
  };

  const handleInput3Change = (event) => {
    setDavaciMasrafi(event.target.value);
  };

  const handleInput4Change = (event) => {
    setDavaliMasrafi(event.target.value);
  };

  const handleInput5Change = (event) => {
    setArabuluculukGideri(event.target.value);
  };

  const handleClear = () => {
    // Clear Inputs
    setKararTarihi('');
    setTalepEdilenTutar(0);
    setKabulEdilenTutar(0);
    setDavaciMasrafi(0);
    setDavaliMasrafi(0);
    setArabuluculukGideri(0);
  
    // Clear Outputs
    setReddedilenTutar('');
    setKabulOrani('');
    setRedOrani('');
    setKabulAvukat('');
    setRedAvukat('');
    setHarc('');
    setDavaliAlinacak('');
    setDavaciAlinacak('');
    setDavaliArabulucuk('');
  };
  

  const handleCalculate = () => {

    if(kararTarihi < "2023-09-21") {
      alert("Karar tarihi 21.09.2023'ten itibaren olmalıdır. Eski programı kullanınız.")
      return;
    }

    const totalTalepEdilenTutar = parseFloat(talepEdilenTutar);
    const totalKabulEdilenTutar = parseFloat(kabulEdilenTutar);
    const totalReddedilenTutar = totalTalepEdilenTutar - totalKabulEdilenTutar;

    // Edge case check
    if (totalTalepEdilenTutar < totalKabulEdilenTutar) {
      alert("Kabul edilen tutar talep edilen tutardan büyük olamaz");
      return;
    }

    if(davaciMasrafi < 0) {
      alert("Davacı masrafı 0'dan küçük olamaz");
      return
    }
    if(davaliMasrafi < 0) {
      alert("Davalı masrafı 0'dan küçük olamaz");
      return
    }

    if(arabulucukGideri < 0) {
      alert("Arabuluculuk Gideri 0'dan küçük olamaz");
      return
    }

    setReddedilenTutar(totalReddedilenTutar);

    // Kabul Oranı Hesaplama
   
    if (totalTalepEdilenTutar === 0) {
      alert("Talep edilen tutar 0 olamaz");
      return;
    } else {
      setKabulOrani("%" + (totalKabulEdilenTutar/totalTalepEdilenTutar * 100)) ;
    }
    
    if (totalTalepEdilenTutar === 0) {
      setRedOrani("%0");
    } else {

    // Red Oranı Hesaplama
    setRedOrani("%" + ((1 - totalKabulEdilenTutar/totalTalepEdilenTutar)* 100));
    }

    // Kabul Edilen Tutar Avukatlık Ücreti
    if(kararTarihi < "2023-09-21") {
      alert("Karar tarihi 21.09.2023'ten itibaren olmalıdır. Eski programı kullanınız.")
      return;
    }
    else {
      var total_sum = 0;
      if(kabulEdilenTutar<= 200000) {
        if(kabulEdilenTutar <= 17900) {
          total_sum = kabulEdilenTutar;
        }
        else {
          total_sum  = kabulEdilenTutar * 0.16;
          if(total_sum < 17900) {
            total_sum = 17900;
          }
        }
      }
      else if(kabulEdilenTutar > 200000 && kabulEdilenTutar <= 400000) {
        total_sum  = (200000 * 0.16) + (kabulEdilenTutar - 200000) * 0.15;
      }
      else if(kabulEdilenTutar > 400000 && kabulEdilenTutar <= 800000) {
        total_sum  = (200000 * 0.16) + (200000 * 0.15) + (kabulEdilenTutar - 400000) * 0.14;
      }
      else if(kabulEdilenTutar > 800000 && kabulEdilenTutar <= 1400000) {
        total_sum  = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (kabulEdilenTutar - 800000) * 0.11;
      }
      else if(kabulEdilenTutar > 1400000 && kabulEdilenTutar <= 2200000) {
        total_sum = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (600000 * 0.11) + (kabulEdilenTutar - 1400000) * 0.08;
      }
      else if(kabulEdilenTutar > 2200000 && kabulEdilenTutar <= 3200000) {
        total_sum = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (600000 * 0.11) + (800000 * 0.08) + (kabulEdilenTutar - 2200000) * 0.05;
      }
      else if(kabulEdilenTutar > 3200000 && kabulEdilenTutar <= 4400000) {
        total_sum = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (600000 * 0.11) + (800000 * 0.08) + (1000000 * 0.05) + (kabulEdilenTutar - 3200000) * 0.03;
      }
      else if(kabulEdilenTutar > 4400000 && kabulEdilenTutar <= 5800000) {
        total_sum = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (600000 * 0.11) + (800000 * 0.08) + (1000000 * 0.05) + (1200000 * 0.03) + (kabulEdilenTutar - 4400000) * 0.02;
      }
      else if (totalKabulEdilenTutar > 5800000) {
        total_sum = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (600000 * 0.11) + (800000 * 0.08) + (1000000 * 0.05) + (1200000 * 0.03) + (1400000 * 0.02 ) (kabulEdilenTutar - 5800000) * 0.01;
      }
      setKabulAvukat(total_sum);
    }
  
    // Reddedilen Avukatlık Tutar Ücreti
    if(kararTarihi < "2023-09-21") {
      alert("Karar tarihi 21.09.2023'ten itibaren olmalıdır. Eski programı kullanınız.")
      return;
    }
    else {
      total_sum = 0;
      if(totalReddedilenTutar <= 200000) {
        if(totalReddedilenTutar <= 17900) {
          total_sum = totalReddedilenTutar;
        }
        else {
          total_sum  = totalReddedilenTutar * 0.16;
          if(total_sum < 17900) {
            total_sum = 17900;
          }
        }
      }
      else if(totalReddedilenTutar > 200000 && totalReddedilenTutar <= 400000) {
        total_sum  = (200000 * 0.16) + (totalReddedilenTutar - 200000) * 0.15;
      }
      else if(totalReddedilenTutar > 400000 && totalReddedilenTutar <= 800000) {
        total_sum  = (200000 * 0.16) + (200000 * 0.15) + (totalReddedilenTutar - 400000) * 0.14;
      }
      else if(totalReddedilenTutar > 800000 && totalReddedilenTutar <= 1400000) {
        total_sum  = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (totalReddedilenTutar - 800000) * 0.11;
      }
      else if(totalReddedilenTutar > 1400000 && totalReddedilenTutar <= 2200000) {
        total_sum = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (600000 * 0.11) + (totalReddedilenTutar- 1400000) * 0.08;
      }
      else if(totalReddedilenTutar> 2200000 && totalReddedilenTutar <= 3200000) {
        total_sum = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (600000 * 0.11) + (800000 * 0.08) + (totalReddedilenTutar - 2200000) * 0.05;
      }
      else if(totalReddedilenTutar> 3200000 && totalReddedilenTutar<= 4400000) {
        total_sum = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (600000 * 0.11) + (800000 * 0.08) + (1000000 * 0.05) + (totalReddedilenTutar- 3200000) * 0.03;
      }
      else if(totalReddedilenTutar > 4400000 && totalReddedilenTutar <= 5800000) {
        total_sum = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (600000 * 0.11) + (800000 * 0.08) + (1000000 * 0.05) + (1200000 * 0.03) + (totalReddedilenTutar- 4400000) * 0.02;
      }
      else if (totalReddedilenTutar > 5800000) {
        total_sum = (200000 * 0.16) + (200000 * 0.15) + (400000 * 0.14) + (600000 * 0.11) + (800000 * 0.08) + (1000000 * 0.05) + (1200000 * 0.03) + (1400000 * 0.02 ) + (totalReddedilenTutar - 5800000) * 0.01;
      }   
      setRedAvukat(total_sum);
    }

    // Harç
    total_sum = totalKabulEdilenTutar * 68.31/1000;
    if(total_sum < 427.60) {
      total_sum = 427.60;
    }
    setHarc(total_sum);

    // Davalıdan Alınacak Yargılama Gideri
    setDavaliAlinacak(parseFloat(davaciMasrafi) * totalKabulEdilenTutar/totalTalepEdilenTutar);

    // Davacıdan Alınacak Yargılama Gideri
    setDavaciAlinacak(parseFloat(davaliMasrafi) * (1 - (totalKabulEdilenTutar/totalTalepEdilenTutar)));

    // Davalıdan Alınacak Arabuluculuk Gideri
    setDavaliArabulucuk(parseFloat(arabulucukGideri) * totalKabulEdilenTutar/totalTalepEdilenTutar)

  };

  return (
    <div className="calculator-container">
      <div className="calculator-left">
        <h2 className="calculator-title">Lütfen Doldurunuz</h2>
        <div className="input-wrapper">
          <label>Karar Tarihi:</label>
          <input type="date" value={kararTarihi} onChange={handleDateChange} />
        </div>
        <div className="input-wrapper">
          <label>Talep Edilen Tutar:</label>
          <input type="number" value={talepEdilenTutar} onChange={handleInput1Change} />
        </div>
        <div className="input-wrapper">
          <label>Kabul Edilen Tutar:</label>
          <input type="number" value={kabulEdilenTutar} onChange={handleInput2Change} />
        </div>
        <div className="input-wrapper">
          <label>Davacı Masrafı:</label>
          <input type="number" value={davaciMasrafi} onChange={handleInput3Change} />
        </div>
        <div className="input-wrapper">
          <label>Davalı Masrafı:</label>
          <input type="number" value={davaliMasrafi} onChange={handleInput4Change} />
        </div>
        <div className="input-wrapper">
          <label>Arabuluculuk Gideri:</label>
          <input type="number" value={arabulucukGideri} onChange={handleInput5Change} />
        </div>
        <div className="button-wrapper">
          <button className="clear-button" onClick={handleClear}>Temizle</button>
          <button className="calculate-button" onClick={handleCalculate}>Hesapla</button>
        </div>
      </div>
      <div className="calculator-right">
        <h3>Sonuçlar:</h3>
        <div className="output-wrapper">
          <label>Reddedilen Tutar:</label>
          <input type="text" value={reddedilenTutar} readOnly />
        </div>
        <div className="output-wrapper">
          <label>Kabul Oranı:</label>
          <input type="text" value={kabulOrani} readOnly />
        </div>
        <div className="output-wrapper">
          <label>Red Oranı:</label>
          <input type="text" value={redOrani} readOnly />
        </div>
        <div className="output-wrapper">
          <label>Kabul Edilen Tutar Avukatlık Ücreti:</label>
          <input type="text" value={kabulAvukat} readOnly />
        </div>
        <div className="output-wrapper">
          <label>Reddedilen Tutar Avukatlık Ücreti:</label>
          <input type="text" value={redAvukat} readOnly />
        </div>
        <div className="output-wrapper">
          <label>Harç:</label>
          <input type="text" value={harc} readOnly />
        </div>
        <div className="output-wrapper">
          <label>Davalıdan Alınacak Yargılama Gideri:</label>
          <input type="text" value={davaliAlinacak} readOnly />
        </div>
        <div className="output-wrapper">
          <label>Davacıdan Alınacak Yargılama Gideri:</label>
          <input type="text" value={davaciAlinacak} readOnly />
        </div>
        <div className="output-wrapper">
          <label>Davalıdan Alınacak Arabuluculuk Gideri:</label>
          <input type="text" value={davaliArabuluculuk} readOnly />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
