export enum UserGender {
  Male = 'male',
  Female = 'female',
  NonBinary = 'non-binary',
}

export const UserGenderLabels = {
  [UserGender.Male]: '남성',
  [UserGender.Female]: '여성',
  [UserGender.NonBinary]: '그 외',
}

export const UserGenderOptions = [
  { icon: '🙆‍♂️', label: '남성', value: UserGender.Male },
  { icon: '🙆‍♀️', label: '여성', value: UserGender.Female },
  { icon: '🙅', label: '그 외', value: UserGender.NonBinary },
]
