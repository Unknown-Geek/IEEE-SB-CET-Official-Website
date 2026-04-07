import React from 'react';
import { MemberCard } from '../components/MemberCard';
import { fetchExecom } from '../services/api';
import { execom2026Members } from '../data/execom2026';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export const ExecomPage = () => {

  
  const [year, setYear] = React.useState(2026);
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const loadTeamMembers = async () => {
      // Reset animation before loading
      setMounted(false);

      if (year === 2026) {
        setTeamMembers(execom2026Members);
        setTimeout(() => setMounted(true), 30);
        return;
      }

      const data = await fetchExecom(year);
      if (data) {
        setTeamMembers(data);
      }

      // small delay to ensure transition starts fresh
      setTimeout(() => setMounted(true), 30);
    };

    loadTeamMembers();
  }, [year]);

  return (
    <section id="team" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            EXECOM {year}
          </h2>
          <div className="w-20 h-1 bg-[#006699] mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated team of student leaders who manage our IEEE
            branch activities and initiatives.
          </p>
        </div>
              <div className="flex justify-center mb-8">
                <Select onValueChange={(value) => setYear(Number(value))}>
  <SelectTrigger>
  <SelectValue placeholder={year} />
  </SelectTrigger>
  <SelectContent>
                {[2026, 2025, 2024, 2023, 2022].map((y) => (
            <SelectItem 
              key={y} 
              value={y}            >
              {y}
            </SelectItem>
          ))}
  </SelectContent>
</Select>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center m-4">
          {teamMembers.map((member, idx) => (
            <div
              key={member.id || idx}
              className={`
                w-full h-full will-change-transform transform transition duration-700 ease-out
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <MemberCard
                image_url={year === 2026 ? member.image_url : `/execom/${year}/${member.image_url}`}
                name={member.name}
                designation={member.designation}
                linkedin_url={member.linkedin_url}
                email={member.email}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
