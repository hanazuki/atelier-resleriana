import * as Optic from '@fp-ts/optic'
import { PlainMessage } from '@bufbuild/protobuf'
import { GlobalSettings, AlchemistSettings } from './gen/settings_pb'
import { keyOrDefault } from './optics'

export const _alchemist = (name: string, title: string) =>
  Optic.id<PlainMessage<GlobalSettings>>()
    .at('alchemists')
    .compose(keyOrDefault(`${name}/${title}`, () => new AlchemistSettings()))
