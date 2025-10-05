// Import all course images
import anatomyImg from "@/assets/courses/anatomy.jpg";
import physiologyImg from "@/assets/courses/physiology.jpg";
import biochemistryImg from "@/assets/courses/biochemistry.jpg";
import pharmacologyImg from "@/assets/courses/pharmacology.jpg";
import pathologyImg from "@/assets/courses/pathology.jpg";
import microbiologyImg from "@/assets/courses/microbiology.jpg";
import surgeryImg from "@/assets/courses/surgery.jpg";
import medicineImg from "@/assets/courses/medicine.jpg";
import rtiActImg from "@/assets/courses/rti-act.jpg";
import leaveRulesImg from "@/assets/courses/leave-rules.jpg";
import financialRulesImg from "@/assets/courses/financial-rules.jpg";
import travelAllowanceImg from "@/assets/courses/travel-allowance.jpg";
import pensionRulesImg from "@/assets/courses/pension-rules.jpg";

// Map course titles/keywords to images
const courseImageMap: Record<string, string> = {
  anatomy: anatomyImg,
  physiology: physiologyImg,
  biochemistry: biochemistryImg,
  pharmacology: pharmacologyImg,
  pathology: pathologyImg,
  microbiology: microbiologyImg,
  surgery: surgeryImg,
  medicine: medicineImg,
  "rti act": rtiActImg,
  rti: rtiActImg,
  "leave rules": leaveRulesImg,
  leave: leaveRulesImg,
  "financial rules": financialRulesImg,
  financial: financialRulesImg,
  "travel allowance": travelAllowanceImg,
  travel: travelAllowanceImg,
  "pension rules": pensionRulesImg,
  pension: pensionRulesImg,
};

export const getCourseImage = (title: string): string | null => {
  const titleLower = title.toLowerCase();
  
  // Try exact match first
  if (courseImageMap[titleLower]) {
    return courseImageMap[titleLower];
  }
  
  // Try partial match
  for (const [key, image] of Object.entries(courseImageMap)) {
    if (titleLower.includes(key)) {
      return image;
    }
  }
  
  return null;
};
