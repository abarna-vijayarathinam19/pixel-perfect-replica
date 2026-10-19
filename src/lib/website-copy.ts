import type { Lang } from "./i18n";

const copy = {
  en: {
    availability: "Appointment availability is confirmed on the Avenset booking portal.", demo: "Avenset in action", demoSub: "A closer look at connected consultations.", pendingVideo: "Demo video coming soon",
    benefits: "Better conversations. Better care.", doctors: "Our doctors", directors: "Board of Directors",
    pendingTeam: "Profiles will be published soon.", profile: "Profile to be announced", name: "Name", position: "Position", specialty: "Specialty",
    portal: "Continue to Avenset", portalSub: "Book and manage your appointments with Avenset.", results: "Matching doctors", noResults: "No doctors match these filters.", clear: "Clear filters",
  },
  ta: {
    availability: "சந்திப்பு கிடைக்கும் நேரங்கள் Avenset பதிவு தளத்தில் உறுதிப்படுத்தப்படும்.", demo: "Avenset செயல்பாட்டில்", demoSub: "இணைக்கப்பட்ட ஆலோசனைகளை நெருக்கமாகப் பாருங்கள்.", pendingVideo: "டெமோ வீடியோ விரைவில்",
    benefits: "சிறந்த உரையாடல்கள். சிறந்த பராமரிப்பு.", doctors: "எங்கள் மருத்துவர்கள்", directors: "இயக்குநர்கள் குழு",
    pendingTeam: "சுயவிவரங்கள் விரைவில் வெளியிடப்படும்.", profile: "சுயவிவரம் விரைவில் அறிவிக்கப்படும்", name: "பெயர்", position: "பதவி", specialty: "சிறப்புத் துறை",
    portal: "Avenset-க்குத் தொடரவும்", portalSub: "Avenset மூலம் உங்கள் சந்திப்புகளைப் பதிவு செய்து நிர்வகிக்கவும்.", results: "பொருந்தும் மருத்துவர்கள்", noResults: "இந்த வடிகட்டிகளுக்கு மருத்துவர்கள் இல்லை.", clear: "வடிகட்டிகளை நீக்கு",
  },
  si: {
    availability: "හමුවීම් ලබාගත හැකි වේලාවන් Avenset වෙන්කිරීමේ ද්වාරයෙන් තහවුරු කෙරේ.", demo: "Avenset ක්‍රියාකාරීව", demoSub: "සම්බන්ධිත උපදේශන දෙස සමීප බැල්මක්.", pendingVideo: "ඩෙමෝ වීඩියෝව ළඟදීම",
    benefits: "වඩා හොඳ සංවාද. වඩා හොඳ සත්කාර.", doctors: "අපගේ වෛද්‍යවරු", directors: "අධ්‍යක්ෂ මණ්ඩලය",
    pendingTeam: "පැතිකඩ ළඟදීම ප්‍රකාශයට පත් කෙරේ.", profile: "පැතිකඩ පසුව නිවේදනය කෙරේ", name: "නම", position: "තනතුර", specialty: "විශේෂඥතාව",
    portal: "Avenset වෙත යන්න", portalSub: "Avenset සමඟ ඔබගේ හමුවීම් වෙන්කර කළමනාකරණය කරන්න.", results: "ගැළපෙන වෛද්‍යවරු", noResults: "මෙම පෙරහන් සඳහා වෛද්‍යවරු නැත.", clear: "පෙරහන් ඉවත් කරන්න",
  },
};

export const websiteCopy = (lang: Lang) => copy[lang];