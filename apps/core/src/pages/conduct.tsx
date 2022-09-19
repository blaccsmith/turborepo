import type { NextPage } from 'next';

const Conduct: NextPage = () => (
  <div className="flex flex-col items-center justify-center space-y-6 p-3 font-bold text-white">
    <h1 className="text-2xl font-semibold md:text-5xl md:font-normal">
      BLACC&apos;s Code of Conduct
    </h1>
    <div className="w-full text-left">
      <h2 className="py-2 text-3xl font-bold text-purple-400">Our Pledge</h2>
      <p className="text-lg font-normal text-white">
        We as members, contributors, and leaders pledge to make participation in our community a
        harassment-free experience for everyone, regardless of age, body size, visible or invisible
        disability, ethnicity, sex characteristics, gender identity and expression, level of
        experience, education, socio-economic status, nationality, personal appearance, race,
        religion, or sexual identity and orientation.
      </p>
      <p className="mt-3 text-lg font-normal text-white">
        We as members, contributors, and leaders pledge to make participation in our community a
        harassment-free experience for everyone, regardless of age, body size, visible or invisible
        disability, ethnicity, sex characteristics, gender identity and expression, level of
        experience, education, socio-economic status, nationality, personal appearance, race,
        religion, or sexual identity and orientation. We pledge to act and interact in ways that
        contribute to an open, welcoming, diverse, inclusive, and healthy community.
      </p>
    </div>
    <div className="w-full text-left ">
      <h2 className="py-2 text-3xl font-bold text-purple-400">Our Standards</h2>
      <p className="text-lg font-normal">
        Examples of behavior that contributes to a positive environment for our community include:
      </p>
      <ul className="list-inside list-disc">
        <li className="my-3 text-sm">Demonstrating empathy and kindness toward other people</li>
        <li className="my-3 text-sm">
          Being respectful of differing opinions, viewpoints, and experiences
        </li>
        <li className="my-3 text-sm">Giving and gracefully accepting constructive feedback</li>
        <li className="my-3 text-sm">
          Accepting responsibility and apologizing to those affected by our mistakes, and learning
          from the experience
        </li>
        <li className="my-3 text-sm">
          Focusing on what is best not just for us as individuals, but for the overall community
        </li>
      </ul>
      <p className="text-lg font-normal">Examples of unacceptable behavior include:</p>
      <ul className="list-inside list-disc">
        <li className="my-3 text-sm">
          The use of sexualized language or imagery, and sexual attention or advances of any kind
        </li>
        <li className="my-3 text-sm">
          Trolling, insulting or derogatory comments, and personal or political attacks
        </li>
        <li className="my-3 text-sm">Public or private harassment</li>
        <li className="my-3 text-sm">
          Publishing others&apos; private information, such as a physical or email address, without
          their explicit permission
        </li>
        <li className="my-3 text-sm">
          Other conduct which could reasonably be considered inappropriate in a professional setting
        </li>
      </ul>
    </div>
    <div className="w-full text-left">
      <h2 className="py-2 text-3xl font-bold text-purple-400">Enforcement Responsibilities</h2>
      <p className="text-lg font-normal text-white">
        Community leaders are responsible for clarifying and enforcing our standards of acceptable
        behavior and will take appropriate and fair corrective action in response to any behavior
        that they deem inappropriate, threatening, offensive, or harmful.
      </p>
      <p className="mt-3 text-lg font-normal text-white">
        Community leaders have the right and responsibility to remove, edit, or reject comments,
        commits, code, wiki edits, issues, and other contributions that are not aligned to this Code
        of Conduct, and will communicate reasons for moderation decisions when appropriate.
      </p>
    </div>
    <div className="w-full text-left">
      <h2 className="py-2 text-3xl font-bold text-purple-400">Scope</h2>
      <p className="text-lg font-normal text-white">
        This Code of Conduct applies within all community spaces, and also applies when an
        individual is officially representing the community in public spaces. Examples of
        representing our community include using an official e-mail address, posting via an official
        social media account, or acting as an appointed representative at an online or offline
        event.
      </p>
    </div>
    <div className="w-full text-left">
      <h2 className="py-2 text-3xl font-bold text-purple-400">Enforcement</h2>
      <p className="text-lg font-normal text-white">
        Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the
        community leaders responsible for enforcement at blaccsmith.xyz@gmail.com. All complaints
        will be reviewed and investigated promptly and fairly.
      </p>
      <p className="mt-3 text-lg font-normal">
        All community leaders are obligated to respect the privacy and security of the reporter of
        any incident.
      </p>
    </div>
    <div className="w-full text-left">
      <h2 className="py-2 text-3xl font-bold text-purple-400">Enforcement Guidelines</h2>
      <p className="text-lg font-normal text-white">
        Community leaders will follow these Community Impact Guidelines in determining the
        consequences for any action they deem in violation of this Code of Conduct:
      </p>
      <ol className="text-white">
        <div>
          <li className="pt-3 text-xl font-bold">1. Correction</li>
          <p className="my-3 text-lg font-normal">
            Community Impact: Use of inappropriate language or other behavior deemed unprofessional
            or unwelcome in the community.
          </p>
          <p className="my-3 text-lg font-normal">
            Consequence: A private, written warning from community leaders, providing clarity around
            the nature of the violation and an explanation of why the behavior was inappropriate. A
            public apology may be requested.
          </p>
        </div>
        <div>
          <li className="pt-3 text-xl font-bold ">2. Warning</li>
          <p className="my-3 text-lg font-normal">
            Community Impact: A violation through a single incident or series of actions.
          </p>
          <p className="my-3 text-lg font-normal">
            Consequence: A warning with consequences for continued behavior. No interaction with the
            people involved, including unsolicited interaction with those enforcing the Code of
            Conduct, for a specified period of time. This includes avoiding interactions in
            community spaces as well as external channels like social media. Violating these terms
            may lead to a temporary or permanent ban.
          </p>
        </div>
        <div>
          <li className="pt-3 text-xl font-bold ">3. Temporary Ban</li>
          <p className="my-3 text-lg font-normal">
            Community Impact: A serious violation of community standards, including sustained
            inappropriate behavior.
          </p>
          <p className="my-3 text-lg font-normal">
            A temporary ban from any sort of interaction or public communication with the community
            for a specified period of time. No public or private interaction with the people
            involved, including unsolicited interaction with those enforcing the Code of Conduct, is
            allowed during this period. Violating these terms may lead to a permanent ban.
          </p>
        </div>
        <div>
          <li className="pt-3 text-xl font-bold ">4. Permanent Ban</li>
          <p className="my-3 text-lg font-normal">
            Community Impact: Demonstrating a pattern of violation of community standards, including
            sustained inappropriate behavior, harassment of an individual, or aggression toward or
            disparagement of classes of individuals.
          </p>
          <p className="my-3 text-lg font-normal">
            Consequence: A permanent ban from any sort of public interaction within the community.
          </p>
        </div>
      </ol>
    </div>
  </div>
);

export default Conduct;
