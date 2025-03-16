export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              MyModules
            </h3>
            <p className="text-sm text-neutral-400">
              Plataforma educativa especializada en Desarrollo web.
            </p>
            <div className="mt-4 flex space-x-4">
              <span className="text-neutral-400 hover:text-white">
                <span className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </span>
              <span className="text-neutral-400 hover:text-white">
                <span className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </span>
              <span className="text-neutral-400 hover:text-white">
                <spanedin className="h-5 w-5" />
                <span className="sr-only">spanedIn</span>
              </span>
              <span className="text-neutral-400 hover:text-white">
                <span className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </span>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Documentación
                </span>
              </li>
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Glosario
                </span>
              </li>
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Tutoriales
                </span>
              </li>
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Webinars
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Sobre nosotros
                </span>
              </li>
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Contacto
                </span>
              </li>
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Empleo
                </span>
              </li>
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Blog
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Términos de servicio
                </span>
              </li>
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Política de privacidad
                </span>
              </li>
              <li>
                <span className="text-neutral-400 hover:text-white">
                  Cookies
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-neutral-400">
          <p>© 2025 MyModules. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
