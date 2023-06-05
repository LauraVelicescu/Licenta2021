package ro.fii.licenta.api.repository;

import java.util.List;

import ro.fii.licenta.api.dao.ProjectMember;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface ProjectMemberRepository extends PersistableEntityRepository<ProjectMember, Long> {

	List<ProjectMember> findByProject_Id(Long project);

	ProjectMember findByProject_IdAndMember_Id(Long projectId, Long memberId);

	List<ProjectMember> findByMember_User_Id(Long userId);

	ProjectMember findByProject_IdAndMember_User_Id(Long projectId, Long userId);
}
