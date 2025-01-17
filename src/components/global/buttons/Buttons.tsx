/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

interface ButtonProps {
  title: string;
  className?: string;
  link?: string;
  type?: "submit" | "reset";
  action?: any;
  onClick?: any;
}

const commonClasses =
  "text-center text-sm py-3 px-5 sm:px-8 text-nowrap font-medium rounded-lg flex justify-center items-center rounded-md transition cursor-pointer";

const LinkBtn = ({ title, link, className }: ButtonProps) => {
  return (
    <Link href={link ? link : ""} className={className}>
      {title}
    </Link>
  );
};

const TypeBtn = ({ type, className, title }: ButtonProps) => {
  return (
    <button type={type} className={className}>
      {title}
    </button>
  );
};

const ClickBtn = ({ action, onClick, className, title }: ButtonProps) => {
  return (
    <>
      {action && (
        <form action={action} className="w-full">
          <button className={className}>{title}</button>
        </form>
      )}
      {onClick && (
        <button onClick={onClick} className={className}>
          {title}
        </button>
      )}
    </>
  );
};

export function PrimaryButton({
  title,
  className,
  link,
  type,
  action,
  onClick,
}: ButtonProps) {
  const myClasses = `${commonClasses} bg-primary text-white hover:bg-primaryDark ${className}`;

  return (
    <>
      {link && <LinkBtn title={title} className={myClasses} link={link} />}

      {type && <TypeBtn title={title} className={myClasses} type={type} />}

      {action && (
        <ClickBtn title={title} className={myClasses} action={action} />
      )}

      {onClick && (
        <ClickBtn title={title} className={myClasses} onClick={onClick} />
      )}
    </>
  );
}

export function PrimaryOutlineButton({
  title,
  className,
  link,
  type,
  action,
  onClick,
}: ButtonProps) {
  const myClasses = `${commonClasses} border-2 border-secondary   text-secondary hover:bg-secondary hover:text-white ${className}`;

  return (
    <>
      {link && <LinkBtn title={title} className={myClasses} link={link} />}

      {type && <TypeBtn title={title} className={myClasses} type={type} />}

      {action && (
        <ClickBtn title={title} className={myClasses} action={action} />
      )}

      {onClick && (
        <ClickBtn title={title} className={myClasses} onClick={onClick} />
      )}
    </>
  );
}
