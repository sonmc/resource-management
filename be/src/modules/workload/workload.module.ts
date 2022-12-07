import { Module } from "@nestjs/common";
import { WorkloadService } from "./workload.service";

@Module({
  controllers: [],
  providers: [WorkloadService],
})
export class WorkloadModule {}
