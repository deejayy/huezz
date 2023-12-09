export interface SettingsState {
  boardWidth: number;
  boardHeight: number;
  latestUpdate: Date;
  ackUpdate: Date | undefined;
  difficulty: number;
}

export const initialSettingsState: SettingsState = {
  boardWidth: 5,
  boardHeight: 10,
  latestUpdate: new Date('2023-12-08 00:00:00'),
  ackUpdate: undefined,
  difficulty: 10,
};
