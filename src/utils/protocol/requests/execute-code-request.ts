import {
  Request,
  ExecuteCodeRequest,
} from 'nia-protocol-js'
import {NiaRequestType, SerializablePB} from '@/utils'

export class NiaExecuteCodeRequest implements SerializablePB<NiaExecuteCodeRequest, ExecuteCodeRequest> {
  private readonly code: string

  constructor(code: string) {
    this.code = code
  }
  
  getCode(): string {
    return this.code
  }

  getType(): NiaRequestType {
    return NiaRequestType.ExecuteCode
  }

  toPB(): ExecuteCodeRequest {
    const executeCodeRequest = new ExecuteCodeRequest()
    executeCodeRequest.setCode(this.code)

    return executeCodeRequest
  }
}
