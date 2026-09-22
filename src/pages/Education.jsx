import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const Education = ({ items = [] }) => {
  return (
    <section
      id="education"
      className="relative mx-auto w-[calc(100%-40px)] max-w-[1200px] pt-26"
    >
      <div className="mb-10 max-w-[860px]">
        <span className="mb-3.5 inline-flex w-fit items-center rounded-full border border-cyan-400/35 bg-cyan-400/[0.08] px-3 py-1.5 text-xs font-extrabold uppercase text-[#8ff7e2]">
          Education
        </span>

        <h2 className="font-[Poppins,Inter,sans-serif] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight">
          Education and qualification.
        </h2>

        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          The purpose of education is to replace an empty mind with an open one.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {items.map((item, index) => (
          <motion.article
            key={`${item.title}-${index}`}
            className="group grid grid-cols-1 items-center gap-5 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.045] px-4 py-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.06] sm:grid-cols-[190px_minmax(0,1fr)] sm:text-left lg:grid-cols-[260px_minmax(0,1fr)_auto] lg:gap-7 lg:p-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <div className="w-full overflow-hidden rounded-[20px] border-4 border-white/[0.08]">
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="h-[190px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[140px] lg:h-[160px] lg:w-[260px]"
              />
            </div>

            <div className="flex min-w-0 flex-col items-center sm:items-start lg:grid lg:grid-cols-[44px_minmax(0,1fr)] lg:items-start lg:gap-x-3">
              <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/[0.12] lg:row-span-2 lg:mb-0">
                <GraduationCap size={21} />
              </div>

              <h3 className="w-full text-lg font-semibold leading-snug text-white sm:text-xl lg:text-[1.35rem]">
                {item.title}
              </h3>

              <p className="mt-2 w-full text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7 lg:mt-1">
                {item.institution}
              </p>
            </div>

            <div className="flex min-w-[175px] items-center justify-center justify-self-center rounded-full bg-gradient-to-r from-[var(--gold)] to-[#fde68a] px-5 py-2.5 text-center text-sm font-extrabold leading-tight text-[#07111d] shadow-[0_8px_24px_rgba(250,204,21,0.12)] lg:justify-self-end">
              {item.period}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Education;
