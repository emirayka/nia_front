import {
  Mapping,
  ExecuteCodeResponse,
  GetDefinedMappingsResponse, Response,
} from 'nia-protocol-js'
import {
  InvalidResponseError, NiaMapping,
} from '@/utils'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaGetDefinedMappingsResponseObject {
  mappings: Array<NiaMapping>
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaGetDefinedMappingsResponse {
  private readonly mappings: Array<NiaMapping>
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaGetDefinedMappingsResponseObject) {
    this.mappings = args.mappings
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  getMappings(): Array<NiaMapping> {
    return this.mappings
  }

  isSuccess(): boolean {
    return this.success
  }

  isError(): boolean {
    return this.error
  }

  isFailure(): boolean {
    return this.failure
  }

  getType(): NiaResponseType {
    return NiaResponseType.GetDefinedMappings
  }

  static fromPB(getDefinedMappingsResponsePB: GetDefinedMappingsResponse): NiaGetDefinedMappingsResponse {
    let mappings: Array<NiaMapping> = []
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (getDefinedMappingsResponsePB.getResultCase()) {
      case GetDefinedMappingsResponse.ResultCase.SUCCESS_RESULT:
        const mappingsPB: Array<Mapping> = getDefinedMappingsResponsePB.getSuccessResult()?.getMappingsList() ?? []

        for (const mappingPB of mappingsPB) {
          const mapping: NiaMapping = NiaMapping.fromPB(mappingPB)

          mappings.push(mapping)
        }

        success = true
        break;

      case GetDefinedMappingsResponse.ResultCase.ERROR_RESULT:
        message = getDefinedMappingsResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;

      case GetDefinedMappingsResponse.ResultCase.FAILURE_RESULT:
        message = getDefinedMappingsResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaGetDefinedMappingsResponseObject = {
      mappings,
      message,
      success,
      error,
      failure
    }

    return new NiaGetDefinedMappingsResponse(args)
  }
}

