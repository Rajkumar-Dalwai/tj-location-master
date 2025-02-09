class MaharashtraVsDistrictsRepo {
  static getExpectedMaharashtraDistricts() {
    return [
      { english: "Ahmednagar", hindi: "अहमदनगर", tamil: "அகமதுநகர்", telugu: "అహ్మద్‌నగర్", marathi: "अहमदनगर" },
      { english: "Akola", hindi: "अकोला", tamil: "அகோலா", telugu: "అకోలా", marathi: "अकोला" },
      { english: "Amravati", hindi: "अमरावती", tamil: "அமராவதி", telugu: "అమరావతి", marathi: "अमरावती" },
      { english: "Beed", hindi: "बीड", tamil: "பீட்", telugu: "బీడు", marathi: "बीड" },
      { english: "Bhandara", hindi: "भंडारा", tamil: "பண்டாரா", telugu: "భండారా", marathi: "भंडारा" },
      { english: "Buldhana", hindi: "बुलढाना", tamil: "புல்தானா", telugu: "బుల్దానా", marathi: "बुलढाणा" },
      { english: "Chandrapur", hindi: "चंद्रपुर", tamil: "சந்திராபூர்", telugu: "చంద్రపూర్", marathi: "चंद्रपूर" },
      { english: "Chhatrapati Sambhajinagar", hindi: "छत्रपति संभाजीनगर", tamil: "சத்ரபதி சம்பாஜிநகர்", telugu: "ఛత్రపతి శంభాజీనగర్", marathi: "छत्रपती संभाजीनगर" },
      { english: "Dharashiv", hindi: "धाराशिव", tamil: "தாராஷிவ்", telugu: "ధరశివ్", marathi: "धाराशिव" },
      { english: "Dhule", hindi: "धुले", tamil: "துலே", telugu: "ధూలే", marathi: "धुळे" },
      { english: "Gadchiroli", hindi: "गडचिरोली", tamil: "கட்சிரோலி", telugu: "గడ్చిరోలి", marathi: "गडचिरोली" },
      { english: "Gondia", hindi: "गोंदिया", tamil: "கோண்டியா", telugu: "గోండియా", marathi: "गोंदिया" },
      { english: "Hingoli", hindi: "हिंगोली", tamil: "ஹிங்கோலி", telugu: "హింగోలి", marathi: "हिंगोली" },
      { english: "Jalgaon", hindi: "जलगांव", tamil: "ஜல்கான்", telugu: "జలగావ్", marathi: "जळगाव" },
      { english: "Jalna", hindi: "जालना", tamil: "ஜல்னா", telugu: "జల్నా", marathi: "जालना" },
      { english: "Kolhapur", hindi: "कोल्हापुर", tamil: "கோலாப்பூர்", telugu: "కొల్హాపూర్", marathi: "कोल्हापूर" },
      { english: "Latur", hindi: "लातूर", tamil: "லத்தூர்", telugu: "లాతూర్", marathi: "लातूर" },
      { english: "Mumbai", hindi: "मुंबई", tamil: "மும்பை", telugu: "ముంబై", marathi: "मुंबई" },
      { english: "Mumbai Suburban", hindi: "मुंबई उपनगर", tamil: "மும்பை புறநகர்", telugu: "ముంబై సబర్బన్", marathi: "मुंबई उपनगर" },
      { english: "Nagpur", hindi: "नागपुर", tamil: "நாக்பூர்", telugu: "నాగపూర్", marathi: "नागपूर" },
      { english: "Nanded", hindi: "नांदेड़", tamil: "நான்டெட்", telugu: "నాందేడ్", marathi: "नांदेड" },
      { english: "Nandurbar", hindi: "नंदुरबार", tamil: "நந்தூர்பார்", telugu: "నందుర్బార్", marathi: "नंदुरबार" },
      { english: "Nashik", hindi: "नासिक", tamil: "நாசிக்", telugu: "నాసిక్", marathi: "नाशिक" },
      { english: "Palghar", hindi: "पालघर", tamil: "பால்கர்", telugu: "పాల్ఘర్", marathi: "पालघर" },
      { english: "Parbhani", hindi: "परभणी", tamil: "பார்ப்பனியம்", telugu: "పర్భాని", marathi: "परभणी" },
      { english: "Pune", hindi: "पुणे", tamil: "புனே", telugu: "పూణే", marathi: "पुणे" },
      { english: "Raigad", hindi: "रायगड", tamil: "ராய்காட்", telugu: "రాయగడ", marathi: "रायगड" },
      { english: "Ratnagiri", hindi: "रत्नागिरि", tamil: "ரத்னகிரி", telugu: "రత్నగిరి", marathi: "रत्नागिरी" },
      { english: "Sangli", hindi: "सांगली", tamil: "சாங்லி", telugu: "సాంగ్లీ", marathi: "सांगली" },
      { english: "Satara", hindi: "सतारा", tamil: "சதாரா", telugu: "సతారా", marathi: "सातारा" },
      { english: "Sindhudurg", hindi: "सिंधुदुर्ग", tamil: "சிந்துதுர்க்", telugu: "సింధుదుర్గ్", marathi: "सिंधुदुर्ग" },
      { english: "Solapur", hindi: "सोलापुर", tamil: "சோலாப்பூர்", telugu: "షోలాపూర్", marathi: "सोलापूर" },
      { english: "Targhar", hindi: "तारघर", tamil: "தர்கர்", telugu: "తార్ఘర్", marathi: "तरघर" },
      { english: "Thane (Navi Mumbai)", hindi: "ठाणे (नवी मुंबई)", tamil: "தானே (நவி மும்பை)", telugu: "థానే (నవీ ముంబై)", marathi: "ठाणे (नवी मुंबई)" },
      { english: "Wardha", hindi: "वर्धा", tamil: "வார்தா", telugu: "వార్ధా", marathi: "वर्धा" },
      { english: "Washim", hindi: "वाशिम", tamil: "வாஷிம்", telugu: "వాషిమ్", marathi: "वाशिम" },
      { english: "Yavatmal", hindi: "यवतमाल", tamil: "யவத்மால்", telugu: "యావత్మాల్", marathi: "यवतमाळ" },
    ];
  }
}

export default MaharashtraVsDistrictsRepo;
