export const TECH_ICON_MAP: Record<string, string> = {
  JavaScript:     'devicon-javascript-plain',
  TypeScript:     'devicon-typescript-plain',
  React:          'devicon-react-original',
  Angular:        'devicon-angularjs-plain',
  NodeJS:         'devicon-nodejs-plain',
  NestJS:         'devicon-nestjs-plain',
  Java:           'devicon-java-plain',
  'Spring Boot':  'devicon-spring-plain',
  SpringBoot:     'devicon-spring-plain',
  Python:         'devicon-python-plain',
  MySQL:          'devicon-mysql-plain',
  PostgreSQL:     'devicon-postgresql-plain',
  MongoDB:        'devicon-mongodb-plain',
  Docker:         'devicon-docker-plain',
  Linux:          'devicon-linux-plain',
  Git:            'devicon-git-plain',
  PHP:            'devicon-php-plain',
  Laravel:        'devicon-laravel-plain',
  SQL:            'fas fa-database',
  Cypress:        'devicon-cypressio-plain',
  Jasmine:        'devicon-jasmine-plain',
  Jest:           'devicon-jest-plain',
  'MUI Material': 'devicon-materialui-plain',
  'HTML & CSS':   'devicon-html5-plain',
};

export const AwsIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    viewBox="0 0 40 24"
    width={size * 1.8}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M11.2 10.3c0 .4.1.8.2 1.1.2.3.4.6.7.8.1.1.1.1.1.2s0 .1-.1.2l-.5.3c-.1 0-.1.1-.2.1s-.2-.1-.3-.2c-.1-.2-.3-.4-.4-.6-.4.5-1 .8-1.7.8-.5 0-.9-.1-1.2-.4-.3-.3-.5-.7-.5-1.2 0-.5.2-1 .5-1.3.4-.3.9-.5 1.5-.5.2 0 .4 0 .6.1.2 0 .4.1.6.1v-.5c0-.5-.1-.8-.3-1-.2-.2-.5-.3-1-.3-.2 0-.4 0-.6.1-.2.1-.4.1-.6.2h-.1c-.1 0-.1-.1-.1-.2v-.4c0-.1 0-.1.1-.2.1 0 .1-.1.2-.1.2-.1.5-.2.7-.2.3-.1.5-.1.8-.1.6 0 1 .1 1.3.4.3.3.4.7.4 1.3v1.7zm-2.3.9c.2 0 .4 0 .6-.1.2-.1.4-.3.5-.5.1-.1.1-.3.1-.4V9.9c-.1 0-.3-.1-.5-.1h-.5c-.3 0-.6.1-.8.2-.2.1-.3.4-.3.7 0 .3.1.5.2.6.2.1.4.2.7.2zm5.3.6c-.1 0-.2 0-.2-.1 0 0-.1-.1-.1-.2L12 7.1c0-.1 0-.2.1-.2h.6c.1 0 .2 0 .2.1 0 0 .1.1.1.2l1.2 4.8 1.1-4.8c0-.1 0-.2.1-.2h.5c.1 0 .2 0 .2.1 0 0 .1.1.1.2l1.1 4.9 1.2-4.9c0-.1.1-.2.1-.2.1 0 .1-.1.2-.1h.6c.1 0 .2.1.1.2l-1.7 5.4c0 .1-.1.2-.1.2-.1 0-.2.1-.2.1h-.5c-.1 0-.2 0-.2-.1 0 0-.1-.1-.1-.2l-1.1-4.7-1.1 4.7c0 .1-.1.2-.1.2-.1 0-.2.1-.2.1h-.5zm8.2.2c-.3 0-.6 0-.9-.1-.3-.1-.5-.2-.7-.3-.1-.1-.1-.1-.1-.2v-.4c0-.1.1-.2.2-.2h.1c.1 0 .1 0 .2.1.2.1.4.2.7.3.2.1.5.1.7.1.4 0 .7-.1.9-.2.2-.1.3-.3.3-.6 0-.2-.1-.3-.2-.4-.1-.1-.4-.2-.7-.3l-1-.3c-.5-.2-.9-.4-1.1-.7-.2-.3-.3-.6-.3-1 0-.3.1-.5.2-.7.1-.2.3-.4.5-.5.2-.1.4-.2.7-.3.3-.1.5-.1.8-.1.2 0 .3 0 .5.1.2 0 .3.1.5.1.1.1.3.1.4.2.1.1.2.1.3.2.1.1.1.1.1.2V7c0 .1-.1.2-.2.2h-.1c-.1 0-.1 0-.2-.1-.3-.2-.7-.3-1.1-.3-.4 0-.6.1-.8.2-.2.1-.3.3-.3.6 0 .2.1.3.2.5.1.1.4.2.8.3l1 .3c.5.2.8.4 1 .7.2.3.3.6.3.9 0 .3-.1.5-.2.8-.1.2-.3.4-.5.6-.2.2-.5.3-.7.3-.3.1-.6.1-.9.1z" />
    <path d="M28.5 13.6c-3.4 2.5-8.3 3.9-12.6 3.9-5.9 0-11.2-2.2-15.3-5.8-.3-.3 0-.6.3-.4 4.4 2.5 9.8 4 15.4 4 3.8 0 7.9-.8 11.7-2.4.5-.3.9.3.5.7z" />
    <path d="M30 11.9c-.4-.5-2.7-.3-3.7-.1-.3.1-.4-.2-.1-.4 1.8-1.3 4.8-.9 5.1-.5.3.4-.1 3.4-1.8 4.8-.3.2-.5.1-.4-.2.4-1 1.3-3.2.9-3.6z" />
  </svg>
);

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function TechIcon({ name, className = '', size = 14 }: TechIconProps) {
  if (name === 'AWS') return <AwsIcon size={size} />;
  const iconClass = TECH_ICON_MAP[name];
  if (!iconClass) return null;
  return <span className={`${iconClass} ${className}`} aria-hidden="true" />;
}
