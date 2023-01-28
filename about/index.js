(function(){
  function getSideTemplate() {

    const side = {
      contact: {
        title: 'Contact',
        list: [
          { label: 'Address', value: 'Glenfield, AUK, 6029</br>(Valid open work visa and willing to relocate)' },
          { label: 'Phone', value: '027-386-8521' },
          { label: 'E-mail', value: 'yanqizhao.career@gmail.com', link: 'mailto:' },
          { label: 'LinkedIn', value: 'linkedin.com/in/yanqizhao', link: 'https://' },
          { label: 'GitHub', value: 'github.com/yanqizhao', link: 'https://' },
          { label: 'Website', value: 'yanqizhao.com/about', link: 'https://' },
        ],
      },
      skill: {
        title: 'Skills',
        maxLevel: 5,
        list: [
          { skill: 'Swift', level: 5 },
          { skill: 'SwiftUI & Combine', level: 5 },
          { skill: 'MVVM Design', level: 5 },
          { skill: 'Objective-C', level: 5 },
          { skill: '3rd party SDKs and API(S)integration', level: 5 },
          { skill: 'XCTest & XCUITest', level: 5 },
          { skill: 'API design knowledge', level: 5 },
          { skill: 'Multi-threading', level: 5 },
          { skill: 'MVC Design', level: 5 },
          { skill: 'Git version control', level: 5 },
          { skill: 'iOS versions and devices', level: 5 },
          { skill: 'Agile and Scrum workflow development', level: 5 },
          { skill: 'Code reviews', level: 5 },
          { skill: 'CI/CD', level: 4 },
          { skill: 'JavaScript', level: 3 },
          { skill: 'React Native', level: 3 },
          { skill: 'Flutter', level: 3 },
        ],
      },
      language: {
        title: 'Languages',
        maxLevel: 5,
        list: [
          { language: 'Chinese', level: 5, proficiency: 'Native Speaker' },
          { language: 'English', level: 4, proficiency: 'Fluent' },
          { language: 'Japanese', level: 3, proficiency: 'Conversational' },
        ],
      }
    };

    const { contact, skill, language } = side;

    return `
      <div class="section-headline">${contact.title}</div>
      <div class="divider"></div>
      ${contact.list.map((everyContact, index) => `
        <div class="section-title${index > 0 ? ' mt18' : ''}">${everyContact.label}</div>
        ${
          everyContact.link ?
          `<a class="section-text highlight" target="_blank" href="${everyContact.link}${everyContact.value}">${everyContact.value}</a>` :
          `<div class="section-text">${everyContact.value}</div>`
        }
      `).join('')}
      <div class="section-headline mt42">${skill.title}</div>
      <div class="divider"></div>
      ${skill.list.map((everySkill, index) => `
        <div class="section-title mt18">${everySkill.skill}</div>
        <div class="reverse-row">
          ${Array(everySkill.level).fill('<div class="dot dark-dot mr4"></div>').join('')}
          ${Array(skill.maxLevel - everySkill.level).fill('<div class="dot light-dot mr4"></div>').join('')} 
        </div>
      `).join('')}
      <div class="section-headline mt42">${language.title}</div>
      <div class="divider"></div>
      ${language.list.map((everyLanguage, index) => `
        <div class="section-title mt18">${everyLanguage.language}</div>
        <div class="reverse-row">
          ${Array(everyLanguage.level).fill('<div class="dot dark-dot mr4"></div>').join('')}
          ${Array(language.maxLevel - everyLanguage.level).fill('<div class="dot light-dot mr4"></div>').join('')} 
        </div>
        <div class="reverse-row section-text mt6">${everyLanguage.proficiency}</div>
      `).join('')}
    `;
  }

  function getContentTemplate(){
    const content = {
      introduction:
        'Dynamic and creative iOS software engineer with more than 7 years of professional experience. Eager to support the development squad with deep understanding of sound code practices and deep expertise in iOS tooling and technology.',
      experience: {
        title: 'Work Experience',
        list: [
          {
            job: 'Senior iOS Software Engineer',
            period: '2021-03 - 2022-09',
            location: 'HelloBike, Hangzhou, China',
            descriptions: [
              'Refined shared account to reduce customer complaints by 50%.',
              'Accomplished Flutter pages of account component to decrease workload by 50%',
              'Integrated quick login via mobile providers, Alipay and Apple channel and made 100K RMB annual savings.',
              'Collaborated with scrum team to fulfil requirements of more than 35 versions of release.',
              'Conducted code review meetings to detect weaknesses and improve product quality per week.',
            ],
            achievement: {
              title: 'Key achievement:',
              descriptions: [
                `Achieved top 1st application of travel category in China's mainland area and over 645K rates on App Store.`,
                'Acquired more than 5 million DAU(Daily Active User) on iOS platform and 15 million DAU on both iOS and Android platform.',
              ],
            },
          },
          {
            job: 'Senior iOS Software Engineer',
            period: '2020-09 - 2021-03',
            location: 'Club Factory & Wholee, Hangzhou, China',
            descriptions: [
              'Built React Native pages of account component to reduce workload by 50%.',
              'Integrated mobile payment platforms such as Stripe and Adyen for better payment experience of users.'
            ],
            achievement: {
              title: 'Key achievement:',
              descriptions: [
                'Took 30% installations of online-shopping applications in India area.',
                'Attained 0.1 billion MAU(Monthly Active User) in 2020.',
              ],
            },
          },
          {
            job: 'Senior iOS Software Engineer',
            period: '2017-04 - 2019-02',
            location: 'Bilibili, Shanghai, China',
            descriptions: [
              `Optimized launch time via removing unnecessary frameworks and decreasing the use of ‘+(void)load' method by 20% cut.`,
              'Implemented faster load of video page for better user experience by redesigning the order of tasks and utilizing pre-load URL.',
              'Refactored networking component and launch component to save developing time by 30%.'
            ],
            achievement: {
              title: 'Key achievement:',
              descriptions: [
                'Achieved 40 million MAU(Monthly Active User) on iOS platform and 0.12 billion MAU on both iOS and Android platform in 2019.',
                `Became 'Chinese YouTube' in China's mainland.`,
              ],
            },
          },
          {
            job: 'iOS Software Engineer',
            period: '2016-04 - 2017-02',
            location: '2345, Shanghai, China',
            descriptions: [
              'Accomplished design and implementation of different components, such as tracking component and APNs component.',
              'Analyzed the design of different competitive products for better features improved.',
              'Utilized Git distributed version control system to cooperate in team.'
            ],
          },
        ],
      },
      education: {
        title: 'Education',
        list: [
          {
            major: 'Bachelor of Engineering: Computer Science and Technology',
            period: '2010-09 - 2014-06',
            school: 'Northwest Normal University - Lanzhou, China',
          }
        ]
      },
      certifications: {
        title: 'Certifications',
        list: [
          {
            time: '2021-01',
            certification: 'JLPT(Japanese-Language Proficiency Test) N2',
          },
          {
            time: '2015-02',
            certification: 'Intermediate Software Design Engineer',
          }
        ]
      },
      communityConference: {
        title: 'Community & Conference',
        list: [
          {
            time: '2021-2022',
            description: 'WWDC Reference Writer ',
            linkList: [
              { label: '10089', link: 'https://xiaozhuanlan.com/topic/6354917082' },
              { label: '110352/110353', link: 'https://xiaozhuanlan.com/topic/7651204893' },
            ],
          },
          {
            time: '2019-09',
            description: 'Google Developer Days attendee',
          }
        ]
      }
    };

    const { introduction, experience, education, certifications, communityConference } = content;

    return `
      <div class="section-text">${introduction}</div>
      <div class="section-headline mt18">${experience.title}</div>
      <div class="divider"></div>
      ${experience.list.map((everyExperience, index) => `
        <div class="section-title${index > 0 ? ' mt42' : ''}">${everyExperience.job}</div>
        <div class="section-title">${everyExperience.period}</div>
        <div class="section-text">${everyExperience.location}</div>
        ${everyExperience.descriptions.map((everyDescription) =>`<div class="section-text">•  ${everyDescription}</div>`).join('')}
        ${everyExperience.achievement ? `<div class="section-text fw-bold">${everyExperience.achievement.title}</div>${everyExperience.achievement.descriptions.map((everyDescription) =>`<div class="section-text">•  ${everyDescription}</div>`).join('')}`: ''}
      `).join('')}
      <div class="section-headline mt42">${education.title}</div>
      <div class="divider"></div>
      ${education.list.map((everyEducation, index) => `
        <div class="section-title${index > 0 ? ' mt42' : ''}">${everyEducation.major}</div>
        <div class="section-title">${everyEducation.period}</div>
        <div class="section-text">${everyEducation.school}</div>
      `).join('')}
      <div class="section-headline mt42">${certifications.title}</div>
      <div class="divider"></div>
      ${certifications.list.map((everyCertification, index) => `
        <div class="section-text"><span class="fw-bold mr18">${everyCertification.time}</span>${everyCertification.certification}</div>
      `).join('')}
      <div class="section-headline mt42">${communityConference.title}</div>
      <div class="divider"></div>
      ${communityConference.list.map((everyCommunityConference, index) => `
        <div class="section-text row">
          <span class="width84 fw-bold mr18">${everyCommunityConference.time}</span>
          <span>
            ${everyCommunityConference.description}
            ${everyCommunityConference.linkList ? everyCommunityConference.linkList.map((everyLink) => `<a class="highlight mr4" target="_blank" href="${everyLink.link}">${everyLink.label}</a>`).join('') : ''}
          </span>
        </div>
      `).join('')}
    `;
  }

  function render({ elementName, template }){
    const mainElement = document.querySelector('main');
    const childElement = document.createElement('div');
    childElement.className = elementName;
    childElement.innerHTML = template;
    mainElement.appendChild(childElement); 
  }

  const contentTemplate = getContentTemplate();
  const sideTemplate =getSideTemplate();
  render({ elementName: 'content', template: contentTemplate });
  render({ elementName: 'side', template: sideTemplate });
})()