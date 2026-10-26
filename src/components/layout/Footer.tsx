import { GraduationCap } from 'lucide-react'
import linkedinIcon from '@/assets/icons/linkedin.svg'

const AUTHORS = [
  { name: 'Leonardo Mortari', linkedin: 'https://www.linkedin.com/in/leonardo-mortari-901b992a7/' },
  { name: 'João Castro', linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-castro-512ab52b5/' },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-gray-500">
      <div className="container max-w-5xl mx-auto flex items-center justify-between py-6 px-4 sm:flex-row flex-col gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-primary mt-1" />
          <span className="text-sm font-medium mt-1">GradeFlow</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          © {new Date().getFullYear()} <span className="font-medium text-gray-300">GradeFlow</span>.
          Todos os direitos reservados.
        </p>

        <div className="text-xs text-gray-400 flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
          <span className="mt-1">Desenvolvido por</span>
          {AUTHORS.map((author, index) => (
            <span key={author.name} className="flex items-center gap-1.5">
              {index > 0 && <span>e</span>}
              <span className="flex items-center gap-1">
                <span className="font-medium text-gray-300 mt-1">{author.name}</span>
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                  title={`LinkedIn de ${author.name}`}
                >
                  <img
                    src={linkedinIcon}
                    className="h-3.5 w-3.5 mt-1"
                    alt={`LinkedIn de ${author.name}`}
                  />
                </a>
              </span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
