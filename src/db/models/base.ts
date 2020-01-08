import { compose, Model } from 'objection';
import Visibility from 'objection-visibility';
import { timestampPlugin } from 'objection-timestamps';

const mixins = compose(Visibility, timestampPlugin());

export class BaseModel extends mixins(Model) {
  readonly id: number;
}
