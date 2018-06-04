import {
    Injectable,
} from '@nestjs/common';
import {
    InjectRepository,
} from '@nestjs/typeorm';
import {
    Group,
} from './../entities';
import { Repository } from 'typeorm';

@Injectable()
export default class GroupService {

constructor(@InjectRepository(Group)private readonly groupRepository: Repository<Group>) {}

    async create(name, user): Promise<Group> {
        const group = this.groupRepository.create({
            name,
        });

        group.users = [user];

        return await this.groupRepository.save(group);
    }
}