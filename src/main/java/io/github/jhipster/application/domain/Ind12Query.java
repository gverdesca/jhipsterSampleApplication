package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Ind12Query.
 */
@Entity
@Table(name = "ind_12_query")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ind12Query implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "db_tipo", length = 100)
    private String dbTipo;

    @NotNull
    @Size(max = 100)
    @Column(name = "cd_cod", length = 100, nullable = false)
    private String cdCod;

    @Size(max = 100)
    @Column(name = "nm_nome", length = 100)
    private String nmNome;

    @Size(max = 1024)
    @Column(name = "de_query", length = 1024)
    private String deQuery;

    @Size(max = 400)
    @Column(name = "dl_path", length = 400)
    private String dlPath;

    @Size(max = 400)
    @Column(name = "de_desc", length = 400)
    private String deDesc;

    @ManyToOne
    private Datasource datasource;

    @OneToMany(mappedBy = "ind12Query")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ba12Widget> widgets = new HashSet<>();

    @ManyToOne
    private Datasource datasource;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDbTipo() {
        return dbTipo;
    }

    public Ind12Query dbTipo(String dbTipo) {
        this.dbTipo = dbTipo;
        return this;
    }

    public void setDbTipo(String dbTipo) {
        this.dbTipo = dbTipo;
    }

    public String getCdCod() {
        return cdCod;
    }

    public Ind12Query cdCod(String cdCod) {
        this.cdCod = cdCod;
        return this;
    }

    public void setCdCod(String cdCod) {
        this.cdCod = cdCod;
    }

    public String getNmNome() {
        return nmNome;
    }

    public Ind12Query nmNome(String nmNome) {
        this.nmNome = nmNome;
        return this;
    }

    public void setNmNome(String nmNome) {
        this.nmNome = nmNome;
    }

    public String getDeQuery() {
        return deQuery;
    }

    public Ind12Query deQuery(String deQuery) {
        this.deQuery = deQuery;
        return this;
    }

    public void setDeQuery(String deQuery) {
        this.deQuery = deQuery;
    }

    public String getDlPath() {
        return dlPath;
    }

    public Ind12Query dlPath(String dlPath) {
        this.dlPath = dlPath;
        return this;
    }

    public void setDlPath(String dlPath) {
        this.dlPath = dlPath;
    }

    public String getDeDesc() {
        return deDesc;
    }

    public Ind12Query deDesc(String deDesc) {
        this.deDesc = deDesc;
        return this;
    }

    public void setDeDesc(String deDesc) {
        this.deDesc = deDesc;
    }

    public Datasource getDatasource() {
        return datasource;
    }

    public Ind12Query datasource(Datasource datasource) {
        this.datasource = datasource;
        return this;
    }

    public void setDatasource(Datasource datasource) {
        this.datasource = datasource;
    }

    public Set<Ba12Widget> getWidgets() {
        return widgets;
    }

    public Ind12Query widgets(Set<Ba12Widget> ba12Widgets) {
        this.widgets = ba12Widgets;
        return this;
    }

    public Ind12Query addWidget(Ba12Widget ba12Widget) {
        this.widgets.add(ba12Widget);
        ba12Widget.setInd12Query(this);
        return this;
    }

    public Ind12Query removeWidget(Ba12Widget ba12Widget) {
        this.widgets.remove(ba12Widget);
        ba12Widget.setInd12Query(null);
        return this;
    }

    public void setWidgets(Set<Ba12Widget> ba12Widgets) {
        this.widgets = ba12Widgets;
    }

    public Datasource getDatasource() {
        return datasource;
    }

    public Ind12Query datasource(Datasource datasource) {
        this.datasource = datasource;
        return this;
    }

    public void setDatasource(Datasource datasource) {
        this.datasource = datasource;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Ind12Query ind12Query = (Ind12Query) o;
        if (ind12Query.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ind12Query.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ind12Query{" +
            "id=" + getId() +
            ", dbTipo='" + getDbTipo() + "'" +
            ", cdCod='" + getCdCod() + "'" +
            ", nmNome='" + getNmNome() + "'" +
            ", deQuery='" + getDeQuery() + "'" +
            ", dlPath='" + getDlPath() + "'" +
            ", deDesc='" + getDeDesc() + "'" +
            "}";
    }
}
