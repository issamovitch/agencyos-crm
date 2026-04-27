
import FulltextSearch from './FulltextSearch';
import AvatarDropdown from './ui/AvatarDropdown';

import { SetLanguage } from '@/components/SetLanguage';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CommandComponent } from '@/components/CommandComponent';

type Props = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lang: string;
};

const Header = ({ id, name, email, avatar }: Props) => (
  <>
    <div id="wrapper-header" className="flex h-20 items-center justify-between space-x-5 p-5">
      <div className="flex w-full max-w-sm justify-start">
        <FulltextSearch />
      </div>
      <div className="flex items-center gap-3">
        <CommandComponent />
        <SetLanguage userId={id} />
        <ThemeToggle />
        <AvatarDropdown avatar={avatar} userId={id} name={name} email={email} />
      </div>
    </div>
  </>
);

export default Header;
