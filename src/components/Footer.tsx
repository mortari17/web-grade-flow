import { GraduationCap } from 'lucide-react'
import linkedinIcon from '../../public/linkedin.svg'

interface FooterProps {
  bgClass?: string
  borderClass?: string
  iconColor?: string
}

export function Footer({
  bgClass = 'bg-black',
  borderClass = 'border-neutral-800',
  iconColor = 'text-primary',
}: FooterProps) {
  return (
    <footer className={`border-t ${borderClass} ${bgClass} text-gray-500`}>
      <div className="container max-w-3xl mx-auto flex items-center justify-between py-6 px-4 sm:flex-row flex-col gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className={`h-4 w-4 ${iconColor} mt-1`} />
          <span className="text-sm font-medium mt-1">GradeFlow</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          © {new Date().getFullYear()} <span className="font-medium text-gray-300">GradeFlow</span>.
          Todos os direitos reservados.
        </p>

        <div className="text-xs text-gray-400 flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
          <span className="mt-1">Desenvolvido por</span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-300 mt-1">Leonardo Mortari</span>
            <a
              href="https://www.linkedin.com/in/leonardo-mortari-901b992a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              title="LinkedIn de Leonardo Mortari"
            >
              <img
                src={linkedinIcon}
                className="h-3.5 w-3.5 mt-1"
                alt="LinkedIn de Leonardo Mortari"
              />
            </a>
          </div>
          <span>e</span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-300 mt-1">João Castro</span>
            <a
              href="https://www.linkedin.com/in/jo%C3%A3o-castro-512ab52b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              title="LinkedIn de João Castro"
            >
              <img src={linkedinIcon} className="h-3.5 w-3.5 mt-1" alt="LinkedIn de João Castro" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
