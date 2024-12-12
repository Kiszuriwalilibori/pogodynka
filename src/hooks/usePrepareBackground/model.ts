export interface WorkerMessage {
  on: { error?: string; image?: string };
  post: { isMobile: boolean };
}

export default WorkerMessage;
