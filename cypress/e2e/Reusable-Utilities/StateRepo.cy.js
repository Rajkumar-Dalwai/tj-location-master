class StateRepo {
    static getExpectedStates() {
      return [
        { english: "Andaman And Nicobar Islands", hindi: "अंडमान व नोकोबार द्वीप समूह", tamil: "அந்தமான் நிக்கோபார் தீவுகள்", telugu: "అండమాన్ మరియు నికోబార్ దీవులు", marathi: "अंदमान आणि निकोबार बेटे" },
        { english: "Andhra Pradesh", hindi: "आंध्र प्रदेश", tamil: "ஆந்திரப் பிரதேசம்", telugu: "ఆంధ్రప్రదేశ్", marathi: "आंध्र प्रदेश" },
        { english: "Arunachal Pradesh", hindi: "अरुणाचल प्रदेश", tamil: "அருணாச்சல பிரதேசம்", telugu: "అరుణాచల్ ప్రదేశ్", marathi: "अरुणाचल प्रदेश" },
        { english: "Assam", hindi: "असम", tamil: "அசாம்", telugu: "అస్సాం", marathi: "आसाम" },
        { english: "Bihar", hindi: "बिहार", tamil: "பீகார்", telugu: "బీహార్", marathi: "बिहार" },
        { english: "Chandigarh", hindi: "चंडीगढ़", tamil: "சண்டிகர்", telugu: "చండీగఢ్", marathi: "चंदीगड" },
        { english: "Chhattisgarh", hindi: "छत्तीसगढ", tamil: "சத்தீஸ்கர்", telugu: "ఛత్తీస్‌గఢ్", marathi: "छत्तीसगड" },
        { english: "Delhi", hindi: "दिल्ली", tamil: "டெல்லி", telugu: "ఢిల్లీ", marathi: "दिल्ली" },
        { english: "Goa", hindi: "गोवा", tamil: "கோவா", telugu: "గోవా", marathi: "गोवा" },
        { english: "Gujarat", hindi: "गुजरात", tamil: "குஜராத்", telugu: "గుజరాత్", marathi: "गुजरात" },
        { english: "Haryana", hindi: "हरियाणा", tamil: "ஹரியானா", telugu: "హర్యానా", marathi: "हरियाणा" },
        { english: "Himachal Pradesh", hindi: "हिमाचल प्रदेश", tamil: "ஹிமாச்சல பிரதேசம்", telugu: "హిమాచల్ ప్రదేశ్", marathi: "हिमाचल प्रदेश" },
        { english: "Jammu And Kashmir", hindi: "जम्मू और कश्मीर", tamil: "ஜம்மு மற்றும் காஷ்மீர்", telugu: "జమ్మూ మరియు కాశ్మీర్", marathi: "जम्मू आणि काश्मीर" },
        { english: "Jharkhand", hindi: "झारखंड", tamil: "ஜார்கண்ட்", telugu: "జార్ఖండ్", marathi: "झारखंड" },
        { english: "Karnataka", hindi: "कर्नाटक", tamil: "கர்நாடகா", telugu: "కర్ణాటక", marathi: "कर्नाटक" },
        { english: "Kerala", hindi: "केरल", tamil: "கேரளா", telugu: "కేరళ", marathi: "केरळा" },
        { english: "Ladakh", hindi: "लद्दाख", tamil: "லடாக்", telugu: "లడఖ్", marathi: "लडाख" },
        { english: "Lakshadweep", hindi: "लक्षद्वीप", tamil: "லட்சத்தீவு", telugu: "లక్షద్వీప్", marathi: "लक्षद्वीप" },
        { english: "Madhya Pradesh", hindi: "मध्य प्रदेश", tamil: "மத்திய பிரதேசம்", telugu: "మధ్యప్రదేశ్", marathi: "मध्य प्रदेश" },
        { english: "Maharashtra", hindi: "महाराष्ट्र", tamil: "மகாராஷ்டிரா", telugu: "మహారాష్ట్ర", marathi: "महाराष्ट्र" },
        { english: "Manipur", hindi: "मणिपुर", tamil: "மணிப்பூர்", telugu: "మణిపూర్", marathi: "मणिपूर" },
        { english: "Meghalaya", hindi: "मेघालय", tamil: "மேகாலயா", telugu: "మేఘాలయ", marathi: "मेघालय" },
        { english: "Mizoram", hindi: "मिजोरम", tamil: "மிசோரம்", telugu: "మిజోరం", marathi: "मिझोराम" },
        { english: "Nagaland", hindi: "नागालैंड", tamil: "நாகாலாந்து", telugu: "నాగాలాండ్", marathi: "नागालँड" },
        { english: "Odisha", hindi: "ओडिशा", tamil: "ஒடிசா", telugu: "ఒడిశా", marathi: "ओडिशा" },
        { english: "Puducherry", hindi: "पुदुचेरी", tamil: "புதுச்சேரி", telugu: "పుదుచ్చేరి", marathi: "पुद्दुचेरी" },
        { english: "Punjab", hindi: "पंजाब", tamil: "பஞ்சாப்", telugu: "పంజాబ్", marathi: "पंजाब" },
        { english: "Rajasthan", hindi: "राजस्थान", tamil: "ராஜஸ்தான்", telugu: "రాజస్థాన్", marathi: "राजस्थान" },
        { english: "Sikkim", hindi: "सिक्किम", tamil: "சிக்கிம்", telugu: "సిక్కిం", marathi: "सिक्कीम" },
        { english: "Tamil Nadu", hindi: "तमिलनाडु", tamil: "தமிழ்நாடு", telugu: "తమిళనాడు", marathi: "तामिळनाडू" },
        { english: "Telangana", hindi: "तेलंगाना", tamil: "தெலுங்கானா", telugu: "తెలంగాణ", marathi: "तेलंगणा" },
        { english: "The Dadra And Nagar Haveli And Daman And Diu", hindi: "दादरा और नगर हवेली और दमन और दीव", tamil: "தாத்ரா மற்றும் நகர் ஹவேலி மற்றும் டாமன் மற்றும் டையூ", telugu: "దాద్రా మరియు నగర్ హవేలీ మరియు డామన్ మరియు డయ్యూ", marathi: "दादरा आणि नगर हवेली आणि दमण आणि दीव" },
        { english: "Tripura", hindi: "त्रिपुरा", tamil: "திரிபுரா", telugu: "త్రిపుర", marathi: "त्रिपुरा" },
        { english: "Uttar Pradesh", hindi: "उत्तर प्रदेश", tamil: "உத்தரப்பிரதேசம்", telugu: "ఉత్తర ప్రదేశ్", marathi: "उत्तर प्रदेश" },
        { english: "Uttarakhand", hindi: "उत्तराखंड", tamil: "உத்தரகாண்ட்", telugu: "ఉత్తరాఖండ్", marathi: "उत्तराखंड" },
        { english: "West Bengal", hindi: "पश्चिम बंगाल", tamil: "மேற்கு வங்காளம்", telugu: "పశ్చిమ బెంగాల్", marathi: "पश्चिम बंगाल" },
      ];
    }
  }
  
  export default StateRepo;
  