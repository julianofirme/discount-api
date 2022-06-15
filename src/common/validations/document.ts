import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'Document', async: false })
export class DocumentValidation implements ValidatorConstraintInterface {
  validate(text: string) {
    const isValidCpf = text.match(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/g);
    const isValidCnpj = text.match(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/);
    return Boolean(isValidCnpj || isValidCpf);
  }

  defaultMessage() {
    return 'The type ($value) is not an valid cpf or cnpj!';
  }
}
