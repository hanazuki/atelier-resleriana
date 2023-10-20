import * as Optic from '@fp-ts/optic'
import { PlainMessage } from '@bufbuild/protobuf'
import { GlobalSettings, AlchemistSettings, UISettings } from './gen/settings_pb'
import { keyOrDefault } from './optics'

export const _alchemist = (name: string, title: string) =>
  Optic.id<PlainMessage<GlobalSettings>>()
    .at('alchemists')
    .compose(keyOrDefault(`${name}/${title}`, () => new AlchemistSettings()))

export const _ui =
  Optic.id<PlainMessage<GlobalSettings>>()
    .compose(keyOrDefault('ui', () => new UISettings()))
