class AssamVsDistrictsRepo {
    static getExpectedAssamDistricts() {
      return [
        { english: "Bajali", hindi: "बजाली", tamil: "பஜாலி", telugu: "బజాలీ", marathi: "भाजली" },
        { english: "Baksa", hindi: "बक्सा", tamil: "பக்சா", telugu: "బక్సా", marathi: "बक्सा" },
        { english: "Barpeta", hindi: "बारपेटा", tamil: "பார்பெட்டா", telugu: "బార్పేట", marathi: "बारपेटा" },
        { english: "Biswanath", hindi: "बिश्वनाथ", tamil: "பிஸ்வநாத்", telugu: "బిస్వనాథ్", marathi: "विश्वनाथ" },
        { english: "Bongaigaon", hindi: "बोंगईगांव", tamil: "போங்கைகான்", telugu: "బొంగైగావ్", marathi: "बोंगईगाव" },
        { english: "Cachar", hindi: "कछार", tamil: "கச்சார்", telugu: "క్యాచర్", marathi: "कचर" },
        { english: "Charaideo", hindi: "चराइदेव", tamil: "சாரிடியோ", telugu: "చరైడియో", marathi: "चारीदेव" },
        { english: "Chirang", hindi: "चिरांग", tamil: "சிராங்", telugu: "చిరాంగ్", marathi: "चिरांग" },
        { english: "Darrang", hindi: "दरांग", tamil: "தர்ராங்", telugu: "దర్రాంగ్", marathi: "दररंग" },
        { english: "Dhemaji", hindi: "धेमाजी", tamil: "தேமாஜி", telugu: "ధేమాజీ", marathi: "धेमाजी" },
        { english: "Dhubri", hindi: "धुबरी", tamil: "துப்ரி", telugu: "ధుబ్రి", marathi: "धुबरी" },
        { english: "Dibrugarh", hindi: "डिब्रूगढ़", tamil: "திப்ருகர்", telugu: "దిబ్రూఘర్", marathi: "दिब्रुगड" },
        { english: "Dima Hasao", hindi: "दीमा हसाओ", tamil: "டிமா ஹசாவ்", telugu: "డిమా హసావో", marathi: "दिमा हासाओ" },
        { english: "Goalpara", hindi: "गोलपाड़ा", tamil: "கோல்பாரா", telugu: "గోల్పారా", marathi: "गोलपारा" },
        { english: "Golaghat", hindi: "गोलाघाट", tamil: "கோலாகாட்", telugu: "గోలాఘాట్", marathi: "गोलाघाट" },
        { english: "Guwahati", hindi: "गुवाहाटी", tamil: "கவுகாத்தி", telugu: "గౌహతి", marathi: "गुवाहाटी" },
        { english: "Hailakandi", hindi: "हैलाकांडी", tamil: "ஹைலகண்டி", telugu: "హైలకండి", marathi: "हायलाकांडी" },
        { english: "Hojai", hindi: "होजाई", tamil: "ஹோஜாய்", telugu: "హోజై", marathi: "होजाई" },
        { english: "Jorhat", hindi: "जोरहाट", tamil: "ஜோர்ஹட்", telugu: "జోర్హాట్", marathi: "जोरहाट" },
        { english: "Kamrup", hindi: "कामरूप", tamil: "கம்ரூப்", telugu: "కామ్రూప్", marathi: "कामरूप" },
        { english: "Karbi Anglong", hindi: "कार्बी आंगलोंग", tamil: "கர்பி ஆங்லாங்", telugu: "కర్బీ అంగ్లాంగ్", marathi: "कार्बी आंगलाँग" },
        { english: "Karimganj", hindi: "करीमगंज", tamil: "கரீம்கஞ்ச்", telugu: "కరీంగంజ్", marathi: "करीमगंज" },
        { english: "Kokrajhar", hindi: "कोकराझार", tamil: "கோக்ரஜர்", telugu: "కోక్రాఝర్", marathi: "कोक्राझार" },
        { english: "Lakhimpur", hindi: "लखीमपुर", tamil: "லக்கிம்பூர்", telugu: "లఖింపూర్", marathi: "लखीमपूर" },
        { english: "Majuli", hindi: "माजुली", tamil: "மஜூலி", telugu: "మజులీ", marathi: "माजुली" },
        { english: "Marigaon", hindi: "मोरीगांव", tamil: "மரிகோன்", telugu: "మరిగావ్", marathi: "मरीगाव" },
        { english: "MORIGAON", hindi: "मोरीगांव", tamil: "மோரிகான்", telugu: "మోరిగాన్", marathi: "मोरीगाव" },
        { english: "Nagaon", hindi: "नगांव", tamil: "நாகோன்", telugu: "నాగోన్", marathi: "नागाव" },
        { english: "Nalbari", hindi: "नलबाड़ी", tamil: "நல்பாரி", telugu: "నల్బారి", marathi: "नलबारी" },
        { english: "North Cachar Hills", hindi: "उत्तर कछार की पहाड़ियाँ", tamil: "வடக்கு கச்சார் மலைகள்", telugu: "ఉత్తర కాచర్ హిల్స్", marathi: "उत्तर काचार टेकड्या" },
        { english: "Sivasagar", hindi: "शिवसागर", tamil: "சிவசாகர்", telugu: "శివసాగర్", marathi: "शिवसागर" },
        { english: "Sonitpur", hindi: "सोनितपुर", tamil: "சோனித்பூர்", telugu: "సోనిత్‌పూర్", marathi: "सोनितपूर" },
        { english: "South Salmara Mankachar", hindi: "दक्षिण सलमारा मनकाचर", tamil: "தெற்கு சல்மாரா மஞ்சச்சார்", telugu: "దక్షిణ సల్మారా మంకాచార్", marathi: "दक्षिण सालमारा मंचाचार" },
        { english: "Tamulpur", hindi: "तामुलपुर", tamil: "தாமுல்பூர்", telugu: "తముల్పూర్", marathi: "तामुलपूर" },
        { english: "Tinsukia", hindi: "तिनसुकिया", tamil: "டின்சுகியா", telugu: "టిన్సుకియా", marathi: "तिनसुकिया" },
        { english: "Udalguri", hindi: "उदलगुड़ी", tamil: "உடல்குரி", telugu: "ఉదల్గురి", marathi: "उदलगुरी" },
        { english: "West Karbi Anglong", hindi: "पश्चिम कार्बी आंगलोंग", tamil: "மேற்கு கர்பி ஆங்லாங்", telugu: "వెస్ట్ కర్బీ అంగ్లాంగ్", marathi: "पश्चिम कार्बी आंगलाँग" }
      ];
    }
  }
  
  export default AssamVsDistrictsRepo;
  