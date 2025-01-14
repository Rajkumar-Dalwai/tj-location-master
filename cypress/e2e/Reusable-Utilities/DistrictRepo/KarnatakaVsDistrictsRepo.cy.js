class KarnatakaVsDistrictsRepo {
    static getExpectedKarnatakaDistricts() {
      return [
        { english: "Bagalkote", hindi: "बागलकोट", tamil: "பாகல்கோட்", telugu: "బాగల్‌కోటే", marathi: "बागलकोट" },
        { english: "Ballari", hindi: "बल्लारी", tamil: "பல்லாரி", telugu: "బళ్లారి", marathi: "बल्लारी" },
        { english: "Bangalore", hindi: "बैंगलोर", tamil: "பெங்களூர்", telugu: "బెంగళూరు", marathi: "बंगलोर" },
        { english: "Bangalore Rural", hindi: "बेंगलुरु ग्रामीण", tamil: "பெங்களூரு கிராமப்புறம்", telugu: "బెంగళూరు రూరల్", marathi: "बंगळुरू ग्रामीण" },
        { english: "Belagavi (Belgaum)", hindi: " बेलगावी (बेलगाम)", tamil: "பெலகாவி", telugu: "బెలగావి", marathi: "बेलागावी" },
        { english: "Bengaluru Urban", hindi: "बेंगलुरु शहरी", tamil: "பெங்களூரு நகர்ப்புறம்", telugu: "బెంగళూరు అర్బన్", marathi: "बेंगळुरू शहरी" },
        { english: "Bidar", hindi: "बीदर", tamil: "பிதார்", telugu: "బీదర్", marathi: "बिदर" },
        { english: "Chamarajanagara", hindi: "चामराजनगर", tamil: "சாமராஜநகர்", telugu: "చామరాజనగర", marathi: "चामराजनगरा" },
        { english: "Chikkaballapura", hindi: "चिक्कबल्लापुर", tamil: "சிக்கபல்லாபுரா", telugu: "చిక్కబళ్లాపుర", marathi: "चिक्कबल्लापुरा" },
        { english: "Chikkamagaluru", hindi: "चिक्कामगलुरु", tamil: "சிக்கமகளூரு", telugu: "చిక్కమగళూరు", marathi: "चिक्कमगलुरू" },
        { english: "Chitradurga", hindi: "चित्रदुर्ग", tamil: "சித்ரதுர்கா", telugu: "చిత్రదుర్గ", marathi: "चित्रदुर्ग" },
        { english: "Dakshina Kannada", hindi: "दक्षिणा कन्नड़", tamil: "தட்சிண கன்னடம்", telugu: "దక్షిణ కన్నడ", marathi: "दक्षिण कन्नड" },
        { english: "Davanagere", hindi: "दावणगेरे", tamil: "தாவங்கரே", telugu: "దావంగెరె", marathi: "दावणगेरे" },
        { english: "Dharwad", hindi: "धारवाड़", tamil: "தார்வாட்", telugu: "ధార్వాడ్", marathi: "धारवाड" },
        { english: "Gadag", hindi: "गदग", tamil: "கடக்", telugu: "గడగ్", marathi: "गदग" },
        { english: "Gulbarga", hindi: "गुलबर्गा", tamil: "குல்பர்கா", telugu: "గుల్బర్గా", marathi: "गुलबर्गा" },
        { english: "Hassan", hindi: "हासन", tamil: "ஹாசன்", telugu: "హసన్", marathi: "हसन" },
        { english: "Haveri", hindi: "हावेरी", tamil: "ஹாவேரி", telugu: "హావేరి", marathi: "हावेरी" },
        { english: "Hubli", hindi: "हुबली", tamil: "ஹூப்ளி", telugu: "హుబ్లీ", marathi: "हुबळी" },
        { english: "Kalaburagi", hindi: "कालाबुरागी", tamil: "கலபுர்கி", telugu: "కలబురగి", marathi: "कलबुर्गी" },
        { english: "Kodagu", hindi: "कोडागू", tamil: "குடகு", telugu: "కొడగు", marathi: "कोडगू" },
        { english: "Kolar", hindi: "कोलार", tamil: "கோலார்", telugu: "కోలార్", marathi: "कोलार" },
        { english: "Koppal", hindi: "कोप्पल", tamil: "கொப்பல்", telugu: "కొప్పల్", marathi: "कोप्पल" },
        { english: "Mandya", hindi: "मांड्या", tamil: "மாண்டியா", telugu: "మండ్య", marathi: "मांड्या" },
        { english: "Mangalore", hindi: "मंगलौर", tamil: "மங்களூர்", telugu: "మంగళూరు", marathi: "मंगलोर" },
        { english: "Mysuru", hindi: "मैसूर", tamil: "மைசூர்", telugu: "మైసూరు", marathi: "म्हैसूर" },
        { english: "Raichur", hindi: "रायचुर", tamil: "ராய்ச்சூர்", telugu: "రాయచూరు", marathi: "रायचूर" },
        { english: "Ramanagara", hindi: "रामनगर", tamil: "ராமநகரா", telugu: "రామనగర", marathi: "रामनगरा" },
        { english: "Shivamogga", hindi: "शिवमोग्गा", tamil: "சிவமொக்கா", telugu: "శివమొగ్గ", marathi: "शिवमोग्गा" },
        { english: "Tumakuru", hindi: "तुमकुर", tamil: "துமகுரு", telugu: "తుమకూరు", marathi: "तुमाकुरु" },
        { english: "Udupi", hindi: "उडुपी", tamil: "உடுப்பி", telugu: "ఉడిపి", marathi: "उडुपी" },
        { english: "Uttara Kannada", hindi: "उत्तर कन्नड़", tamil: "உத்தர கன்னடம்", telugu: "ఉత్తర కన్నడ", marathi: "उत्तरा कन्नड" },
        { english: "Vijayanagara", hindi: "विजयनगर", tamil: "விஜயநகர்", telugu: "విజయనగరం", marathi: "विजयनगर" },
        { english: "Vijayapura (Bijapur)", hindi: "विजयपुरा(बीजापुर)", tamil: "விஜயபுரா", telugu: "విజయపుర", marathi: "विजयपुरा" },
        { english: "Yadgir", hindi: "यादगीर", tamil: "யாத்கிர்", telugu: "యాద్గిర్", marathi: "यादगीर" },
      ];
    }
  }
  
  export default KarnatakaVsDistrictsRepo;
  