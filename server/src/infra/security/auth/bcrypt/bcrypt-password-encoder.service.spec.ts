import { Test, TestingModule } from '@nestjs/testing';
import { BcryptPasswordEncoderService } from './bcrypt-password-encoder.service';

describe('BcryptPasswordEncoderService', () => {
  let service: BcryptPasswordEncoderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptPasswordEncoderService],
    }).compile();

    service = module.get<BcryptPasswordEncoderService>(BcryptPasswordEncoderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
