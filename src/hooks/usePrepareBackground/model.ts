export interface WorkerMessage {
  on: { error?: string; image?: string };
  post: { isMobile: boolean; apiKey: string };
}

export default WorkerMessage;
